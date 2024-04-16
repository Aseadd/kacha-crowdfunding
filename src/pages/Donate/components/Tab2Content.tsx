import Comment from "./Comment";
import SendIcon from "src/components/Icons/SendIcon";
import { useAddCommentMutation } from "src/api/data";
import { ICommentInput, ICommentInputData, ICommentWithUser } from "src/model/comment";
import { useNotificationContext } from "src/context/NotificationContext";
import { selectAuth } from "src/store/states/auth";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import commentValidator from "src/validator/comment";
import CommentTextAreaInput from "src/components/Form/CommetTextAreaInput";
import { useParams } from "react-router-dom";

export interface IProps {
    comments: ICommentWithUser[];
    reload: () => void;
    canReply: boolean;
    canComment: boolean;
    date: string;
}

export default function Tab2Content({ comments, date, reload, canComment, canReply }: IProps) {
    const auth = useSelector(selectAuth);
    const { control, handleSubmit, reset } = useForm<ICommentInputData>({ resolver: yupResolver(commentValidator) });
    const [addCommentAction, { isLoading }] = useAddCommentMutation();
    const { showError, showSuccess } = useNotificationContext();
    const id = useParams().id ?? "";

    const onSubmit = async ({ comment }: ICommentInputData) => {
        try {
            const query: ICommentInput = { comment, isReply: false, campaign_id: id, parent_id: null };
            await addCommentAction(query);
            reset();
            showSuccess({ message: "Comment added successfully" });
            reload();
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    return (
        <div className="w-full pb-6">
            {comments.map((comment, index) => (
                <Comment canReply={canReply} showReply key={index} date={date} comment={comment} reload={reload} />
            ))}
            {auth.isLoggedIn && canComment && (
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
    );
}
