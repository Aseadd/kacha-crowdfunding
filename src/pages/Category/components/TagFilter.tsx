import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TagFilterItem } from "src/components/DropdownItem";
import { ITag } from "src/model/tag";
import { selectCampaigns } from "src/store/states/campaign";

interface IProps {
    tags: ITag[];
}
export default function TagFilter({ tags }: IProps) {
    const [slice, setSlice] = useState<number | undefined>(5);
    const toggleShowMore = () => setSlice((prev) => (prev ? undefined : 5));
    const campaigns = useSelector(selectCampaigns).data;

    const _tags = useMemo(
        () => tags.map((value) => ({ ...value, count: campaigns.filter((item) => value._id === item.tag_id).length })),
        [campaigns, tags]
    );

    return (
        <div className="w-full flex flex-col gap-y-1">
            {_tags.slice(0, slice).map((tag, index) => (
                <TagFilterItem key={index} tag={tag} />
            ))}
            {tags.length > 5 && (
                <div className="w-full pt-4">
                    <button onClick={toggleShowMore} className="outline-none text-primary text-base font-normal underline">
                        Show {slice ? "more" : "less"}
                    </button>
                </div>
            )}
        </div>
    );
}
