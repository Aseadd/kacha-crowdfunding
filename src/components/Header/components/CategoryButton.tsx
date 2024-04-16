import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import { CategoryDropdownItem } from "src/components/DropdownItem";
import { selectCategories } from "src/store/states/category";

export default function CategoryButton() {
    const categories = useSelector(selectCategories);

    return (
        <Dropdown
            overlayClassName="category-dropdown"
            trigger={["click"]}
            menu={{
                items: categories.map((value) => ({
                    key: value._id,
                    label: <CategoryDropdownItem category={value} />,
                })),
            }}
            placement="bottomRight">
            <button className="nav outline-none text-base font-normal text-[#323232]">Categories</button>
        </Dropdown>
    );
}
