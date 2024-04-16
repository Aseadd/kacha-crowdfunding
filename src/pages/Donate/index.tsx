import { Button, Spin, Tabs } from "antd";
import flag from "src/assets/svg/flag.svg";
import OrangeFavoriteIcon from "src/components/Icons/OrangeFavoriteIcon";
import YellowTagIcon from "src/components/Icons/YellowTagIcon";
import RightSideComponent from "./components/RightSideComponent";
import Tab1Content from "./components/Tab1Content";
import Tab2Content from "./components/Tab2Content";
import Tab3Content from "./components/Tab3Content";
import ConfirmationModal from "src/components/Modal/ConfirmationModal";
import PaymentProcessModal from "src/components/Modal/PaymentProcessModal";
import useDonate from "src/hooks/useDonate";
import Helper from "src/utilities/helper";
import MyFavoriteIcon from "src/components/Icons/MyFavoriteIcon";

export default function Donate() {
    const {
        campaign,
        control,
        date,
        errors,
        auth,
        fetchCampaign,
        getValues,
        handleAddToFavourite,
        handleCloseConfirmation,
        handleCloseProcess,
        handleOpenProcess,
        handleShare,
        handleSubmit,
        onSubmit,
        openConfirmation,
        openProcess,
        setValue,
        tag,
        currencies,
    } = useDonate();

    return (
        <main className="w-full mx-auto max-w-[1200px]">
            {!campaign ? (
                <div className="w-full flex min-h-screen justify-center items-center p-10">
                    <Spin tip="" size="large"></Spin>
                </div>
            ) : (
                <div className="w-full px-2 xs:px-8 md:px-0 md:pt-11 flex items-start">
                    <div className="w-full flex flex-col gap-y-3 md:gap-y-0">
                        <h1 className="text-black font-medium text-base xs:text-2xl md:text-[32px]">{campaign.title}</h1>
                        <div className="w-full md:px-[10px]">
                            <div className="md:py-4 w-full relative py-4">
                                {auth.isLoggedIn && (
                                    <Button
                                        onClick={handleAddToFavourite}
                                        className="md:hidden h-8 xs:h-[51px] w-8 xs:w-[51px] rounded-full bg-[#FFF9E7] absolute top-9 right-5 flex justify-center items-center">
                                        {campaign.is_favourite ? <MyFavoriteIcon /> : <OrangeFavoriteIcon />}
                                    </Button>
                                )}
                                <img src={campaign.campaign_image} alt="" className="w-full rounded-[20px]" />
                            </div>
                            <div className="w-full flex flex-col gap-y-6 md:hidden">
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-base xs:text-[32px] text-black font-medium ">
                                        ${campaign.raised.toLocaleString("en")}{" "}
                                        <span className="text-[#00000099] text-sm font-light">
                                            USD raised of ${campaign.target.toLocaleString("en")} goal
                                        </span>
                                    </p>
                                    <div className="flex items-center bg-[#FFF9E7] rounded-xl border border-secondary py-[2px] px-[6px] gap-x-1">
                                        <YellowTagIcon />
                                        <span className="text-secondary text-[8px] xs:text-xs font-extrabold">{tag?.name}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-[#cbd4e678] h-1 rounded-lg overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-lg"
                                        style={{ width: `${Helper.getPercent(campaign.raised, campaign.target)}%` }}></div>
                                </div>
                                <p className="text-[10px] font-light text-[#000000e0]">{campaign.total_donors} donations</p>
                                <div className="w-full flex flex-col gap-y-5">
                                    <Button
                                        onClick={handleOpenProcess}
                                        className="h-10 xs:h-14 hover-white text-white flex justify-center items-center text-sm xs:text-base font-bold rounded-[10px] bg-primary"
                                        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                                        Donate Now
                                    </Button>
                                    <Button
                                        onClick={handleShare}
                                        className="h-10 xs:h-14 text-secondary border border-secondary flex justify-center items-center text-sm xs:text-base font-bold rounded-[10px] bg-white"
                                        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)" }}>
                                        Share
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full mt-5 md:mt-11">
                                <Tabs
                                    tabBarStyle={{ width: "100%", fontSize: "15px", fontWeight: "600" }}
                                    items={[
                                        {
                                            label: <div className="w-full">Story</div>,
                                            key: "1",
                                            children: <Tab1Content handleOpenProcess={handleOpenProcess} campaign={campaign} />,
                                        },
                                        {
                                            label: <div className="w-full">Supports</div>,
                                            key: "2",
                                            children: (
                                                <Tab2Content
                                                    date={date}
                                                    canComment={campaign.donated}
                                                    canReply={campaign.isOwner}
                                                    comments={campaign.comments}
                                                    reload={fetchCampaign}
                                                />
                                            ),
                                        },
                                        {
                                            label: <div className="w-full">Organizer</div>,
                                            key: "3",
                                            children: <Tab3Content user={campaign.campaign_bio} />,
                                        },
                                    ]}
                                />
                                <div className="w-full pb-14">
                                    <div className="pt-6 pb-14">
                                        <div className="h-[1px] bg-[#C6CDD5] w-full"></div>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <img src={flag} alt="" className="w-3" />
                                        <span className="text-[#737373] font-normal text-sm">Report</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RightSideComponent
                        handleAddToFavourite={handleAddToFavourite}
                        handleOpenProcess={handleOpenProcess}
                        campaign={campaign}
                    />
                </div>
            )}
            <PaymentProcessModal
                currencies={currencies}
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                setValue={setValue}
                errors={errors}
                open={openProcess}
                handleClose={handleCloseProcess}
            />
            {campaign && (
                <ConfirmationModal
                    campaign={campaign}
                    getValues={getValues}
                    open={openConfirmation}
                    handleClose={handleCloseConfirmation}
                />
            )}
        </main>
    );
}
