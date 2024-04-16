import { Button, Input, Spin, Tag } from "antd";
import SearchIcon from "src/components/Icons/SearchIcon";
import TagCloseIcon from "src/components/Icons/TagCloseIcon";
import LeftArrowIcon from "src/components/Icons/LeftArrowIcon";
import RightArrowIcon from "src/components/Icons/RightArrowIcon";
import LeftSideComponent from "./components/LeftSideComponent";
import FilterDrawer from "./components/FilterDrawer";
import CategoryFilterIcon from "src/components/Icons/CategoryFilterIcon";
import Card from "./components/Card";
import useCategory from "src/hooks/useCateogy";

export default function Category() {
    const {
        handleNext,
        handlePrevious,
        handleUncheckCategory,
        handleUncheckTag,
        items,
        onClose,
        open,
        page,
        showDrawer,
        campaigns,
        handleQueryChange,
        isLoading,
        checkedCategories,
        checkedTags,
    } = useCategory();

    return (
        <main className="w-full px-3 xs:px-8 md:px-0">
            <div className="max-w-[1200px] mx-auto flex items-start gap-x-8 pb-12">
                <LeftSideComponent />
                <FilterDrawer onClose={onClose} open={open} />
                <div className="w-full pt-[72px]">
                    <div className="w-full flex items-start md:pl-5 gap-x-5 justify-between">
                        <div className="max-md:hidden flex-wrap grow flex gap-x-6 gap-y-3 items-center">
                            {checkedCategories
                                .filter((value) => value.checked)
                                .map((value, index) => (
                                    <Tag
                                        key={index}
                                        onClose={() => handleUncheckCategory(value)}
                                        className="px-5 py-2 rounded-[30px] border-[#E4E4E4] border text-[#726C6C] text-base font-normal flex items-center  "
                                        closeIcon={<TagCloseIcon />}>
                                        {value.name}
                                    </Tag>
                                ))}
                            {checkedTags
                                .filter((value) => value.checked)
                                .map((value, index) => (
                                    <Tag
                                        key={index}
                                        onClose={() => handleUncheckTag(value)}
                                        className="px-5 py-2 rounded-[30px] border-[#E4E4E4] border text-[#726C6C] text-base font-normal flex items-center  "
                                        closeIcon={<TagCloseIcon />}>
                                        {value.name}
                                    </Tag>
                                ))}
                        </div>
                        <div className="">
                            <Input
                                onChange={handleQueryChange}
                                type="search"
                                placeholder="Search"
                                className="category-search border border-[#E4E4E4] w-[189px] xs:w-[261px] px-4 py-[9px] text-base font-normal rounded-[15px]"
                                prefix={<SearchIcon />}
                            />
                        </div>
                        <Button
                            onClick={showDrawer}
                            className="md:hidden h-auto px-4 py-[10px] bg-white rounded-lg border border-[#D0D5DD] flex items-center gap-x-2">
                            <CategoryFilterIcon />
                            <span className="max-xs-hidden text-[#344054] text-sm font-medium">Filters</span>
                        </Button>
                    </div>
                    <div className="w-full mt-8 flex flex-wrap gap-x-2 max-xs:justify-between xs:gap-x-6 gap-y-6 xs:gap-y-8">
                        {isLoading ? (
                            <div className="w-full flex min-h-screen justify-center items-center p-10">
                                <Spin tip="" size="large"></Spin>
                            </div>
                        ) : (
                            campaigns.data.map((campaign, index) => <Card campaign={campaign} key={index} />)
                        )}
                    </div>
                    <div className="w-full flex pt-[61px] justify-between items-center">
                        <p className="text-[#344054] text-sm font-medium">
                            {" "}
                            {page} - {items} of {campaigns.total_count} items
                        </p>
                        {campaigns.total_count > campaigns.limit && (
                            <div className="flex items-center gap-x-3">
                                <Button
                                    onClick={handlePrevious}
                                    style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
                                    className="bg-white border-[#D0D5DD] rounded-lg flex items-center gap-x-1 h-auto px-3 py-2">
                                    <LeftArrowIcon /> <span className="max-xs-hidden text-[#344054] text-sm font-medium">Prev</span>
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
                                    className="bg-white border-[#D0D5DD] rounded-lg flex items-center gap-x-1 h-auto px-3 py-2">
                                    <span className="max-xs-hidden text-[#344054] text-sm font-medium">Next</span>
                                    <RightArrowIcon />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full px-3 pb-8">
                <div className="h-[1px] w-full bg-[#CBD4E6]"></div>
            </div>
        </main>
    );
}
