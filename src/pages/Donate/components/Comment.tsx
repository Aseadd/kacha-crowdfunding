import { useParams } from "react-router-dom";
import DotIcon from "src/components/Icons/DotIcon";
import LikeIcon from "src/components/Icons/LikeIcon";
import ReplyIcon from "src/components/Icons/ReplyIcon";
import { ICommentInput, ICommentInputData, ICommentWithUser, ILikeResponse } from "src/model/comment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAddCommentMutation, useLikeCommentMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { selectAuth } from "src/store/states/auth";
import commentValidator from "src/validator/comment";
import { useState } from "react";
import CommentTextAreaInput from "src/components/Form/CommetTextAreaInput";
import SendIcon from "src/components/Icons/SendIcon";
import moment from "moment";
import { imageUrl } from "src/utilities/image";
import DisabledLikeIcon from "src/components/Icons/DisabledLikeIcon";
import accountIcon from "src/assets/svg/account.svg";

interface IProps {
    className?: string;
    comment: ICommentWithUser;
    reload: () => void;
    showReply: boolean;
    canReply: boolean;
    date: string;
}

export default function Comment({ className, comment, date, reload, showReply, canReply }: IProps) {
    const id = useParams().id ?? "";
    const auth = useSelector(selectAuth);
    const [show, setShow] = useState<boolean>(false);
    const { showError, showSuccess } = useNotificationContext();
    const { control, handleSubmit, reset } = useForm<ICommentInputData>({ resolver: yupResolver(commentValidator) });
    const [addCommentAction, { isLoading }] = useAddCommentMutation();
    const [likeCommentAction] = useLikeCommentMutation();
    const onSubmit = async (input: ICommentInputData) => {
        try {
            if (input.comment.trim().length > 0) {
                const query: ICommentInput = { ...input, isReply: true, campaign_id: id, parent_id: comment._id };
                await addCommentAction(query);
                reset();
                showSuccess({ message: "Comment added successfully" });
                reload();
                setShow(false);
            } else {
                showError({ message: "Comment cant be empty" });
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };
    const handleToggle = () => setShow((prev) => !prev);
    const handleLikeComment = async () => {
        if (auth.isLoggedIn) {
            try {
                const response: ILikeResponse | any = await likeCommentAction(comment._id).unwrap();
                if ([200, 201, 204].includes(response?.status_code)) {
                    showSuccess({ message: response.message });
                    reload();
                } else showError({ message: response?.data?.detail ?? "Network error" });
            } catch (error: any) {
                showError({ message: error?.data?.detail ?? "Network error" });
            }
        }
    };

    return (
        <>
            <div className={`${className} w-full p-4`}>
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D9D9D9] flex justify-center items-center">
                            <img
                                src={comment.user.profile ? imageUrl(comment.user.profile)! : accountIcon}
                                alt=""
                                className="w-full h-full rounded-full"
                            />
                        </div>
                        <div className="text-black">
                            <h6 className="text-sm xs:text-xl font-semibold">
                                {comment.user.firstname} {comment.user.middlename}
                            </h6>
                            <p className="text-xs xs:text-base font-light">{moment.utc(comment.created_at).from(date, true)}</p>
                        </div>
                    </div>
                    <div className="text-black text-xs xs:text-lg font-semibold">${comment.amount}</div>
                </div>
                <div className="w-full mt-[3px] pl-[43px]">
                    <p className="text-sm xs:text-base font-normal text-[#00000099] ">{comment.comment}</p>
                    {showReply && (
                        <div className="w-full flex gap-1 xs:gap-2 items-center pt-1">
                            <button className="disabled:cursor-not-allowed" disabled={!auth.isLoggedIn} onClick={handleLikeComment}>
                                {comment.likes > 0 ? <LikeIcon /> : <DisabledLikeIcon />}
                            </button>
                            <span className="text-black font-light text-sm xs:text-base">{comment.isLiked}</span>
                            <DotIcon />
                            <span className="text-black font-normal text-sm xs:text-base">
                                <span className="max-xs:hidden">Show </span> {comment.replies.length} replies
                            </span>
                            {auth.isLoggedIn && canReply && (
                                <>
                                    <DotIcon />
                                    <button onClick={handleToggle} className="flex items-center gap-x-1">
                                        <ReplyIcon />
                                        <span className="text-sm xs:text-base font-medium text-[#999]">Reply</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full pl-8 xs:pl-[59px]">
                <div className="w-full border-l-2 border-[#E9EBF0] xs:pl-3">
                    {comment.replies.map((value, index) => (
                        <div className="w-full pr-[31px]" key={index}>
                            <Comment date={date} canReply={false} showReply={false} comment={value} reload={reload} className="pl-1" />
                        </div>
                    ))}

                    {show && canReply && auth.isLoggedIn && (
                        <div className="w-full pt-3 max-xs:pl-2 xs:pr-[10px] flex">
                            <CommentTextAreaInput control={control} name="comment" placeholder="reply...." />
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit(onSubmit)}
                                className="disabled:cursor-not-allowed outline-none bg-primary flex justify-center items-center w-[70px] h-[65px] rounded-r-[5px]">
                                <SendIcon />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
