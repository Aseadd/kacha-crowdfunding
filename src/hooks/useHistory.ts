import { useState, useEffect, useMemo } from "react";
import { useHistoriesMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IHistoryCampaigns, IHistoriesResponse } from "src/model/campaign";
import { IDonateFilterInput } from "src/model/donate";

export default function useHistory() {
    const [open, setOpen] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistoryCampaigns>({ startPage: 0, data: [], page: 0, per_page: 10, total_count: 0 });
    const [historyAction, { isLoading }] = useHistoriesMutation();
    const { showError } = useNotificationContext();

    useEffect(() => {
        getHistory();
        // eslint-disable-next-line
    }, [history.page, history.per_page, history.categoriesId, history.fromDate, history.toDate, history.maxAmount, history.minAmount]);

    useEffect(() => {
        setHistory((prev) => {
            const startPage = lastPage - 3 > prev.page ? prev.page : prev.startPage;
            return { ...prev, startPage };
        });
        // eslint-disable-next-line
    }, [history.page]);

    const getHistory = async () => {
        try {
            const response: IHistoriesResponse = await historyAction({
                limit: history.per_page,
                page: history.page,
                categoriesId: history.categoriesId,
                fromDate: history.fromDate,
                maxAmount: history.maxAmount,
                minAmount: history.minAmount,
                toDate: history.toDate,
            }).unwrap();
            setHistory((prev) => ({
                ...prev,
                data: response.data.map((value) => ({ ...value, key: `${value.cause}_${Math.random()}` })),
                total_count: response.total_count,
            }));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Something went wrong" });
        }
    };

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    const lastPage = useMemo(() => Math.ceil(history.total_count / history.per_page), [history.total_count, history.per_page]);

    const handleFiler = ({ categories, fromDate, maxAmount, minAmount, toDate }: IDonateFilterInput) => {
        setHistory((prev) => ({ ...prev, categoriesId: categories.map((value) => value._id), minAmount, maxAmount, toDate, fromDate }));
    };

    return { showDrawer, onClose, lastPage, open, isLoading, setHistory, history, handleFiler };
}
