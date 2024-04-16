import OrangeFavoriteIcon from "src/components/Icons/OrangeFavoriteIcon";
import YellowLgTagIcon from "src/components/Icons/YellowLgTagIcon";
import ShareIcon from "src/components/Icons/ShareIcon";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectAuth } from "src/store/states/auth";
import { useNotificationContext } from "src/context/NotificationContext";
import { ICampaignFullInfo } from "src/model/campaign";
import { selectTags } from "src/store/states/tag";
import { useMemo } from "react";
import Helper from "src/utilities/helper";
import { imageUrlHttps } from "src/utilities/image";
import MyFavoriteIcon from "src/components/Icons/MyFavoriteIcon";

interface IProps {
    campaign: ICampaignFullInfo;
    handleOpenProcess: () => void;
    handleAddToFavourite: () => void;
}

export default function RightSideComponent({ handleOpenProcess, campaign, handleAddToFavourite }: IProps) {
    const auth = useSelector(selectAuth);
    const { showError, showSuccess } = useNotificationContext();
    const tags = useSelector(selectTags);

    const tag = useMemo(
        () => tags.find((value) => value._id === campaign?.tag_id),
        // eslint-disable-next-line
        [campaign, tags]
    );

    const handleShare = async () => {
        const response = await Helper.handleCopy(window.location.href);
        if (response.status === "error") showError({ message: response.message });
        else showSuccess({ message: "Link copied to clipboard successfully" });
    };

    return (
        <div className="max-md:hidden w-full max-w-[407px] pt-11">
            <div className="w-full py-5 px-[10px]">
                <div
                    className="w-full rounded-[20px] px-[30px] py-[27px] bg-white"
                    style={{ boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.08)" }}>
                    <div className="w-full flex flex-col gap-y-[35px]">
                        <div className="w-full flex gap-y-3 flex-col">
                            <div className="w-full flex flex-col gap-y-6">
                                <div className="w-full flex justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col gap-y-3">
                                            <div className="flex gap-x-1">
                                                <YellowLgTagIcon />
                                                <span className="text-secondary font-extrabold text-sm">{tag?.name}</span>
                                            </div>
                                            <p className="text-[32px] text-black font-medium ">
                                                ${campaign.raised.toLocaleString("en")}{" "}
                                                <span className="text-[#00000099] text-sm font-light">USD</span>
                                            </p>
                                        </div>
                                        <p className="text-[#00000099] text-[15px] font-light">
                                            raised of ${campaign.target.toLocaleString("en")}
                                        </p>
                                    </div>
                                    <div className="flex">
                                        {auth.isLoggedIn && (
                                            <Button
                                                onClick={handleAddToFavourite}
                                                className="w-[51px] h-[51px] rounded-full border-secondary border-2 flex justify-center items-center p-0">
                                                {campaign.is_favourite ? <MyFavoriteIcon /> : <OrangeFavoriteIcon />}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full bg-[#cbd4e678] h-1 rounded-lg overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-lg"
                                        style={{ width: `${Helper.getPercent(campaign.raised, campaign.target)}%` }}></div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-[#000000e0] text-sm font-light">
                                    {Number(Helper.getPercent(campaign.raised, campaign.target)).toFixed(1)}%{" "}
                                    <span className="text-[10px]">left</span>
                                </p>
                                <p className="text-[#000000e0] text-sm font-light">
                                    {campaign.total_donors} <span className="text-[10px]">donations</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                            <button
                                onClick={handleOpenProcess}
                                className="outline-none bg-primary py-2 w-full max-w-[183px] text-center text-white rounded-[10px]"
                                style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                                Donate Now
                            </button>
                            <Button
                                onClick={handleShare}
                                className="flex justify-center items-center w-[54px] bg-secondary h-10 rounded-[10px]">
                                <ShareIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-full px-5 flex justify-center">
                <img src={imageUrlHttps(campaign.ads)} alt="" className="w-full" />
            </div>
        </div>
    );
}
