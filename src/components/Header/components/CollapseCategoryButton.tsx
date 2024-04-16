import { Collapse } from "antd";
import { useSelector } from "react-redux";
import DrawerArrowDownIcon from "src/components/Icons/DrawerArrowDownIcon";
import DrawerLocationIcon from "src/components/Icons/DrawerLocationIcon";
import { selectCategories } from "src/store/states/category";

interface IProps {
    handleCategoryNavigation: () => void;
}

export default function CollapseCategoryButton({ handleCategoryNavigation }: IProps) {
    const categories = useSelector(selectCategories);

    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: "1",
                    label: (
                        <div className="flex p-3 items-center gap-x-3">
                            <DrawerLocationIcon />
                            <span className="text-[#323232] text-lg font-normal">Categories</span>
                            <DrawerArrowDownIcon />
                        </div>
                    ),
                    children: (
                        <div className="w-full flex flex-col gap-y-2 pl-12">
                            {categories.map((value) => (
                                <button
                                    key={value._id}
                                    onClick={handleCategoryNavigation}
                                    className="text-start px-3 py-1 text-[#535763] text-base font-normal">
                                    {value.name}
                                </button>
                            ))}
                        </div>
                    ),
                },
            ]}
            style={{ background: "#fff" }}
            className="p-0 main-menu-category-collapse"
        />
    );
}
