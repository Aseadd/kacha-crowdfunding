import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteName } from "src/constants/routes";
import { ICampaign } from "src/model/campaign";
import Helper from "src/utilities/helper";

interface IProps {
    campaign: ICampaign;
}

export default function Card({ campaign }: IProps) {
    const navigate = useNavigate();

    return (
        <div
            className="w-full max-w-[162px] max-xs:mx-auto xs:max-w-[235px] md:max-w-[272px] py-3 px-2 rounded-md bg-[#ffffff4d]"
            style={{ boxShadow: "0px 2.62995px 26.29948px 0px rgba(0, 0, 0, 0.08)" }}>
            <div className="flex flex-col w-full gap-y-3 h-full">
                <img src={campaign.campaign_image} alt="" width={"100%"} className="w-full rounded-md" />
                <div className="w-full flex flex-col gap-y-3 h-full justify-between">
                    <p className="font-semibold text-sm xs:text-base md:text-lg text-[#323232]">{campaign.title}</p>
                    <p className="text-[#323232] text-sm font-light max-xs:hidden line-clamp-2">{campaign.story}</p>
                    <div className="w-full h-[2.63px] rounded bg-[#CBD4E6] overflow-hidden">
                        <div
                            className={`h-full bg-secondary`}
                            style={{ width: `${Helper.getPercent(campaign.raised, campaign.target)}%` }}></div>
                    </div>
                    <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-y-2 gap-x-2 whitespace-nowrap text-[#323232] text-xs md:text-sm font-normal">
                        <p className="whitespace-break-spaces">
                            ${Number(campaign.raised).toFixed(2)} <span className="font-bold">raised</span> of $
                            {Number(campaign.target).toFixed(2)}{" "}
                        </p>
                        <Button
                            onClick={() => navigate(`${RouteName.Campaign}/${campaign.campaign_id}`)}
                            className="text-black font-medium text-xs w-full xs:w-20 px-2 rounded-md h-6 items-center border-none bg-[#eaecf03d]">
                            Donate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
