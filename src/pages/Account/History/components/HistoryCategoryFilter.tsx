import { useMemo, useState } from "react";
import { HistoryCategoryFilterItem } from "src/components/DropdownItem";
import { IHistory } from "src/model/campaign";
import { ICategory } from "src/model/category";

interface IProps {
    categories: ICategory[];
    histories: IHistory[];
    handleCategoryChange: (value: ICategory) => void;
}

export default function HistoryCategoryFilter({ categories, histories, handleCategoryChange }: IProps) {
    const [slice, setSlice] = useState<number | undefined>(5);
    const _categories = useMemo(
        () => categories.map((value) => ({ ...value, count: histories.filter((item) => value.name === item.category).length })),
        [histories, categories]
    );
    const toggleShowMore = () => setSlice((prev) => (prev ? undefined : 5));

    return (
        <div className="w-full flex flex-col gap-y-1">
            {_categories.slice(0, slice).map((category, index) => (
                <HistoryCategoryFilterItem handleCategoryChange={handleCategoryChange} key={index} category={category} />
            ))}

            {categories.length > 5 && (
                <div className="w-full pt-4">
                    <button onClick={toggleShowMore} className="outline-none text-primary text-base font-normal underline">
                        Show {slice ? "more" : "less"}
                    </button>
                </div>
            )}
        </div>
    );
}
