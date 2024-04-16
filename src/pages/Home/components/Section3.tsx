import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteName } from "src/constants/routes";
import { ICampaign } from "src/model/campaign";
import { selectCampaigns } from "src/store/states/campaign";

export default function Section3() {
    const campaigns = useSelector(selectCampaigns).data;

    return (
        <section className="py-5 xs:py-16 w-full bg-white ">
            <div className="max-w-[1196px] mx-auto w-full">
                <div className="w-full flex flex-col px-3 xs:px-8 xs:py-16 md:p-0 gap-y-6 md:gap-y-16 ">
                    <div className="text-secondary uppercase text-base xs:text-2xl md:text-[34px] font-bold text-center py-2 md:py-0">
                        Featured initiatives
                    </div>

                    <div className="w-full flex max-xs:gap-x-6 gap-x-3 md:gap-x-7 overflow-x-auto max-xs:pb-3">
                        <div className="w-[276px] xs:max-w-[241px] md:max-w-[380px] xs:w-full">
                            {campaigns[0] && <Card1 campaign={campaigns[0]} />}
                        </div>
                        <div className="w-auto xs:w-full h-auto flex flex-row xs:flex-col gap-y-5 gap-x-6">
                            <div className="w-auto xs:w-full h-full flex gap-x-6 xs:gap-x-5 max-xs:h-auto">
                                <div className="w-auto">{campaigns[1] && <Card2 campaign={campaigns[1]} />}</div>
                                <div className="w-auto">{campaigns[2] && <Card3 campaign={campaigns[2]} />}</div>
                            </div>
                            <div className="w-auto xs:w-full h-full flex gap-x-6 xs:gap-x-5">
                                <div className="w-auto">{campaigns[3] && <Card4 campaign={campaigns[3]} />}</div>
                                <div className="w-auto">{campaigns[4] && <Card5 campaign={campaigns[4]} />}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface IProps {
    campaign: ICampaign;
}

function Card5({ campaign }: IProps) {
    return (
        <Link to={`${RouteName.Campaign}/${campaign.campaign_id}`} state={campaign}>
            <div
                className="w-[276px] xs:w-full h-full xs:max-w-[181px] md:max-w-[285px] rounded-[11.618px] overflow-hidden bg-[lightgray] bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${campaign.campaign_image})` }}>
                <div className="w-full h-full p-[18px] bg-black-y-linear flex flex-col justify-end">
                    <div className="text-white text-start">
                        <h6 className="text-[13.236px] md:text-[26.867px] font-black pt-10">{campaign.title}</h6>
                        <p className="text-[9.927px] md:text-base font-light line-clamp-3">{campaign.story}</p>
                        <p className="mt-2 text-[9.927px] md:text-sm font-semibold">${Number(campaign.raised).toFixed(2)} raised</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Card4({ campaign }: IProps) {
    return (
        <Link to={`${RouteName.Campaign}/${campaign.campaign_id}`} state={campaign}>
            {" "}
            <div
                className="w-[276px] xs:w-full h-full xs:max-w-[308px] md:max-w-[484px] rounded-[11.618px] overflow-hidden bg-[lightgray] bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${campaign.campaign_image})` }}>
                <div className="w-full h-full p-[18px] bg-black-y-linear flex flex-col justify-end">
                    <div className="text-white text-start">
                        <h6 className="text-[13.236px] md:text-[26.867px] font-black pt-10">{campaign.title}</h6>
                        <p className="text-[9.927px] md:text-base font-light line-clamp-3">{campaign.story}</p>
                        <p className="mt-2 text-[9.927px] md:text-sm font-semibold">${Number(campaign.raised).toFixed(2)} raised</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Card3({ campaign }: IProps) {
    return (
        <Link to={`${RouteName.Campaign}/${campaign.campaign_id}`} state={campaign}>
            {" "}
            <div
                className="w-[276px] xs:w-full h-full xs:max-w-[235px] md:max-w-[371px] rounded-[11.618px] overflow-hidden bg-[lightgray] bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${campaign.campaign_image})` }}>
                <div className="w-full h-full p-[18px] bg-black-y-linear flex flex-col justify-end">
                    <div className="text-white text-start">
                        <h6 className="text-[13.236px] md:text-[26.867px] font-black pt-10">{campaign.title}</h6>
                        <p className="text-[9.927px] md:text-base font-light line-clamp-3">{campaign.story}</p>
                        <p className="mt-2 text-[9.927px] md:text-sm font-semibold">${Number(campaign.raised).toFixed(2)} raised</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Card2({ campaign }: IProps) {
    return (
        <Link to={`${RouteName.Campaign}/${campaign.campaign_id}`} state={campaign}>
            {" "}
            <div
                className="w-[276px] xs:w-full h-full xs:max-w-[253px] md:max-w-[399px] rounded-[11.618px] overflow-hidden bg-[lightgray] bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${campaign.campaign_image})` }}>
                <div className="w-full h-full p-[18px] bg-black-y-linear flex flex-col justify-end">
                    <div className="text-white text-start">
                        <h6 className="text-[13.236px] md:text-[26.867px] font-black pt-10">{campaign.title}</h6>
                        <p className="text-[9.927px] md:text-base font-light line-clamp-3">{campaign.story}</p>
                        <p className="mt-2 text-[9.927px] md:text-sm font-semibold">${Number(campaign.raised).toFixed(2)} raised</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Card1({ campaign }: IProps) {
    return (
        <Link to={`${RouteName.Campaign}/${campaign.campaign_id}`} state={campaign}>
            {" "}
            <div
                className="w-[276px] xs:w-full rounded-[11.618px] overflow-hidden bg-[lightgray] bg-no-repeat bg-cover bg-center h-full"
                style={{ backgroundImage: `url(${campaign.campaign_image})` }}>
                <div className="w-full p-[18px] pt-96 bg-black-y-linear flex flex-col justify-end h-full">
                    <div className="text-white text-start">
                        <h6 className="text-[13.236px] md:text-[26.867px] font-black">{campaign.title}</h6>
                        <p className="text-[9.927px] md:text-base font-light line-clamp-5">{campaign.story}</p>
                        <p className="mt-2 text-[9.927px] md:text-sm font-semibold">${Number(campaign.raised).toFixed(2)} raised</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
