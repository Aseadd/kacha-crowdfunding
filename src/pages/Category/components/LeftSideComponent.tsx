import { Collapse } from "antd";
import { CategoryCheckBoxThemeProvider } from "src/theme/ThemeProvider";
import CategoryFilter from "./CategoryFilter";
import TagFilter from "./TagFilter";
import { useDispatch, useSelector } from "react-redux";
import { clearAllCategories, selectCategories } from "src/store/states/category";
import { clearAllTags, selectTags } from "src/store/states/tag";

export default function LeftSideComponent() {
    const tags = useSelector(selectTags);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const handleClearAll = () => {
        dispatch(clearAllCategories());
        dispatch(clearAllTags());
    };

    return (
        <CategoryCheckBoxThemeProvider>
            <div className="max-md:hidden w-full max-w-[304px] flex flex-col gap-y-[30px] px-4 py-8 mt-[72px] border border-[#F3F3F3] rounded-lg bg-white">
                <h3 className="text-[#140342] text-2xl font-medium">Filters by (3)</h3>
                <Collapse
                    defaultActiveKey={["1", "2"]}
                    bordered={false}
                    items={[
                        {
                            key: "1",
                            label: <p className="text-primary text-[20px] font-medium">Category</p>,
                            children: <CategoryFilter categories={categories} />,
                        },
                        {
                            key: "2",
                            label: <p className="text-primary text-[20px] font-medium">Tags</p>,
                            children: <TagFilter tags={tags} />,
                        },
                    ]}
                    style={{ background: "#fff" }}
                    className="p-0 category-collapse"
                />
                <button
                    onClick={handleClearAll}
                    className="outline-none border border-secondary rounded-[30px] text-secondary text-center font-normal text-base px-5 py-2 w-fit">
                    Clear All
                </button>
            </div>
        </CategoryCheckBoxThemeProvider>
    );
}
