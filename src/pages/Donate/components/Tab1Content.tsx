import { Button } from "antd";
import { useNotificationContext } from "src/context/NotificationContext";
import { ICampaignFullInfo } from "src/model/campaign";
import Helper from "src/utilities/helper";

interface IProps {
    handleOpenProcess: () => void;
    campaign: ICampaignFullInfo;
}

export default function Tab1Content({ campaign, handleOpenProcess }: IProps) {
    const { showError, showSuccess } = useNotificationContext();
    const handleShare = async () => {
        const response = await Helper.handleCopy(window.location.href);
        if (response.status === "error") showError({ message: response.message });
        else showSuccess({ message: "Link copied to clipboard successfully" });
    };

    return (
        <div className="w-full text-black font-normal text-xs xs:text-sm md:text-base">
            {campaign.story}
            <div className="hidden md:flex pt-9  justify-center items-center gap-x-5">
                <button
                    onClick={handleOpenProcess}
                    className="py-3 text-white outline-none font-bold text-base w-full max-w-[285px] bg-primary rounded-[10px] text-center hover:text-white"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                    Donate Now
                </button>
                <Button
                    onClick={handleShare}
                    className="py-3 h-auto text-secondary font-bold text-base w-full max-w-[285px] bg-white rounded-[10px] text-center hover:text-secondary border-2 border-secondary"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                    Share
                </Button>
            </div>
        </div>
    );
}
