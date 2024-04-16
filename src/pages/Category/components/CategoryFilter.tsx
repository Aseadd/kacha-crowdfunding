import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CategoryFilterItem } from "src/components/DropdownItem";
import { ICategory } from "src/model/category";
import { selectCampaigns } from "src/store/states/campaign";

interface IProps {
    categories: ICategory[];
}

export default function CategoryFilter({ categories }: IProps) {
    const [slice, setSlice] = useState<number | undefined>(5);
    const campaigns = useSelector(selectCampaigns).data;

    const _categories = useMemo(
        () => categories.map((value) => ({ ...value, count: campaigns.filter((item) => value._id === item.category_id).length })),
        [campaigns, categories]
    );
    const toggleShowMore = () => setSlice((prev) => (prev ? undefined : 5));

    return (
        <div className="w-full flex flex-col gap-y-1">
            {_categories.slice(0, slice).map((category, index) => (
                <CategoryFilterItem key={index} category={category} />
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
