import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCampaignsMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { ICampaignsResponse } from "src/model/campaign";
import { ICategory } from "src/model/category";
import { ITag } from "src/model/tag";
import { selectCampaigns, setCampaign, nextPage, previousPage } from "src/store/states/campaign";
import { selectCheckedCategories, updateCategory } from "src/store/states/category";
import { selectCheckedTags, updateTag } from "src/store/states/tag";

export default function useCategory() {
    const checkedCategories = useSelector(selectCheckedCategories);
    const checkedTags = useSelector(selectCheckedTags);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const campaigns = useSelector(selectCampaigns);
    const [fetchCampaignAction, { isLoading }] = useCampaignsMutation();
    const [query, setQuery] = useState<string>("");
    const { showError } = useNotificationContext();

    useEffect(() => {
        fetchCampaign();
        // eslint-disable-next-line
    }, [campaigns.reload, checkedCategories.length, checkedTags.length, query]);

    const fetchCampaign = async () => {
        try {
            const { data, page, per_page, total_count }: ICampaignsResponse = await fetchCampaignAction({
                tag_ids: checkedTags.map((value) => value._id),
                category_ids: checkedCategories.map((value) => value._id),
                limit: 9,
                query,
                page: campaigns.page - 1,
            }).unwrap();
            dispatch(setCampaign({ data, total_count, page, limit: per_page }));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Something went wrong" });
        }
    };

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    const handleUncheckCategory = (category: ICategory) => dispatch(updateCategory({ ...category, checked: false }));
    const handleUncheckTag = (tag: ITag) => dispatch(updateTag({ ...tag, checked: false }));
    const handleNext = () => dispatch(nextPage());
    const handlePrevious = () => dispatch(previousPage());
    const page = useMemo(() => (campaigns.page - 1) * campaigns.limit, [campaigns.page, campaigns.limit]);
    const items = useMemo(() => {
        const count = (campaigns.page - 1) * campaigns.limit + campaigns.limit;
        return count < campaigns.total_count ? count : campaigns.total_count;
    }, [campaigns.page, campaigns.limit, campaigns.total_count]);
    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    return {
        showDrawer,
        handleQueryChange,
        isLoading,
        campaigns,
        onClose,
        handleUncheckCategory,
        handleUncheckTag,
        handleNext,
        handlePrevious,
        page,
        items,
        open,
        checkedCategories,
        checkedTags,
    };
}
