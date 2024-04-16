import { Button, Dropdown, Input, Spin } from "antd";
import DownIcon from "src/components/Icons/DownIcon";
import SearchIcon from "src/components/Icons/SearchIcon";
import CategoryFilterIcon from "src/components/Icons/CategoryFilterIcon";
import { RouteName } from "src/constants/routes";
import SelectedRadioIcon from "src/components/Icons/SelectedRadioIcon";
import UnselectedRadioIcon from "src/components/Icons/UnselectedRadioIcon";
import useFavorite from "src/hooks/useFavorite";
import Helper from "src/utilities/helper";

export default function Favorite() {
    const {
        favorites,
        handleNext,
        handlePrev,
        handleSortAscendingByDate,
        handleSortDescendingByDate,
        handleSortAscendingByTitle,
        handleSortDescendingByTitle,
        isLoading,
        navigate,
        handleSearch,
    } = useFavorite();

    return (
        <main className="w-full xs:pt-10 px-2 max-xs:py-3 xs:px-8 md:px-0 md:pb-24 md:pl-14">
            <h1 className="text-black font-normal text-base xs:text-[32px] mb-8 md:hidden">Favorite</h1>
            <div className="w-full flex justify-between items-center">
                <div className="w-[400px]">
                    <Input
                        type="search"
                        onChange={handleSearch}
                        prefix={<SearchIcon />}
                        className="max-xs:w-[189px] xs:w-[261px] md:w-[292px] px-4 py-2 bg-white border border-[#D0D5DD] rounded-lg text-base font-normal"
                        placeholder="Search"
                    />
                </div>
                <div className="pr-4">
                    <Dropdown
                        overlayClassName="favorite-sort"
                        trigger={["click"]}
                        menu={{
                            items: [
                                { key: "1", label: <TitleLabel text="Alphabetical" />, disabled: true },
                                {
                                    key: "2",
                                    label: (
                                        <ItemLabel
                                            text="A - Z"
                                            isSelected={favorites.order === "asc" && favorites.orderBy === "alphabet"}
                                        />
                                    ),
                                    onClick: handleSortAscendingByTitle,
                                },
                                {
                                    key: "3",
                                    label: (
                                        <ItemLabel
                                            text="Z - A"
                                            isSelected={favorites.order === "desc" && favorites.orderBy === "alphabet"}
                                        />
                                    ),
                                    onClick: handleSortDescendingByTitle,
                                },
                                { key: "4", label: <TitleLabel text="Date" />, disabled: true },
                                {
                                    key: "5",
                                    label: (
                                        <ItemLabel
                                            text="Newest first"
                                            isSelected={favorites.order === "asc" && favorites.orderBy === "date"}
                                        />
                                    ),
                                    onClick: handleSortAscendingByDate,
                                },
                                {
                                    key: "6",
                                    label: (
                                        <ItemLabel
                                            text="Oldest first"
                                            isSelected={favorites.order === "desc" && favorites.orderBy === "date"}
                                        />
                                    ),
                                    onClick: handleSortDescendingByDate,
                                },
                            ],
                        }}
                        placement="bottomRight">
                        <Button className="h-auto px-4 xs:px-2 py-[10px] xs:py-1 bg-white xs:bg-[#091e420a] rounded-[10px] border border-[#D0D5DD] flex items-center gap-x-1">
                            <span className="text-[#42526E] text-base font-normal max-xs-hidden">Sort by</span>
                            <span className="max-xs-hidden">
                                <DownIcon />
                            </span>
                            <span className="min-xs-hidden">
                                <CategoryFilterIcon />
                            </span>
                        </Button>
                    </Dropdown>
                </div>
            </div>
            {isLoading ? (
                <div className="w-full flex min-h-screen justify-center items-center p-10">
                    <Spin tip="" size="large"></Spin>
                </div>
            ) : (
                <>
                    <div className="w-full pt-8 xs:pt-[54px] flex flex-wrap justify-between items-start gap-y-[52px]">
                        {favorites.data.length > 0 ? (
                            favorites.data.map((campaign, index) => (
                                <div
                                    key={index}
                                    className="w-[164px] xs:w-[234px] md:w-[255px] py-[10px] px-2 xs:px-3 rounded-[10.5px] bg-[#ffffff4d]"
                                    style={{ boxShadow: "0px 2.62995px 26.29948px 0px rgba(0, 0, 0, 0.08)" }}>
                                    <div className="w-full flex flex-col gap-y-[2px]">
                                        <img
                                            src={campaign.campaign_image}
                                            alt=""
                                            className="w-full h-[141px] xs:h-[151px] rounded-[10px]"
                                            height={151}
                                        />
                                        <div className="flex flex-col w-full gap-y-3 xs:gap-y-[15px]">
                                            <p className="py-[6px] text-sm font-semibold text-[#323232] mt-1">{campaign.title}</p>
                                            <div className="w-full h-1 rounded-xl overflow-hidden bg-[#CBD4E6]">
                                                <div
                                                    className="h-full bg-secondary"
                                                    style={{ width: `${Helper.getPercent(campaign.raised, campaign.target)}%` }}></div>
                                            </div>
                                            <div className="w-full flex flex-col xs:flex-row justify-between items-center py-2 gap-y-2">
                                                <p className="text-[#323232] text-[10.52px] font-normal">
                                                    {campaign.raised.toLocaleString("en")} <span className="font-bold">raised</span> of{" "}
                                                    {campaign.target.toLocaleString("en")}
                                                </p>
                                                <Button
                                                    onClick={() => navigate(`${RouteName.Campaign}/${campaign.campaign_id}`)}
                                                    className="bg-[#eaecf03d] rounded-md h-[21px] w-full xs:w-[74px] justify-center items-center flex text-black font-medium text-[10.52px] border-none">
                                                    Donate
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full py-10 px-4">
                                <h1 className="text-center text-lg font-semibold">No Favourite Campaign added yet</h1>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between pt-8 max-md:pb-8">
                        {favorites.data.length > 0 && (
                            <p className="text-sm font-medium text-[#344054]">
                                {favorites.page * favorites.limit} - {favorites.page * favorites.limit + favorites.limit} of{" "}
                                {favorites.total_count} items
                            </p>
                        )}
                        {favorites.total_count > favorites.limit && (
                            <div className="flex items-center gap-x-3">
                                <Button
                                    onClick={handlePrev}
                                    className="py-1 xs:py-2 px-3 rounded-lg border border-[#D0D5DD] bg-white text-[#344054] text-sm font-medium h-auto"
                                    style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}>
                                    Previous
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="py-1 xs:py-2 px-4 rounded-lg border border-[#D0D5DD] bg-white text-[#344054] text-sm font-medium h-auto"
                                    style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}>
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}

interface IItemLabelProps {
    text: string;
    isSelected: boolean;
}
function ItemLabel({ isSelected, text }: IItemLabelProps) {
    return (
        <div className="flex items-center gap-x-4">
            {isSelected ? <SelectedRadioIcon /> : <UnselectedRadioIcon />}{" "}
            <span className="text-[#172B4D] text-sm font-normal font-source">{text}</span>
        </div>
    );
}

interface ITitleLabelProps {
    text: string;
}
function TitleLabel({ text }: ITitleLabelProps) {
    return <span className="text-[#6B778C] text-xs font-bold cursor-text">{text}</span>;
}
