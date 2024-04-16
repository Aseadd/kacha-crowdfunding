import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFavouriteCampaignsMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IFavouriteCampaigns, IFavouriteCampaignResponse } from "src/model/campaign";

export default function useFavorite() {
    const [favorites, setFavorites] = useState<IFavouriteCampaigns>({
        limit: 10,
        page: 0,
        total_count: 0,
        data: [],
        order: "asc",
        orderBy: "alphabet",
        search: "",
    });
    const [fetchFavouriteCampaignsAction, { isLoading }] = useFavouriteCampaignsMutation();
    const { showError } = useNotificationContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavouriteCampaigns();
        // eslint-disable-next-line
    }, [favorites.limit, favorites.page, favorites.order, favorites.orderBy, favorites.search]);

    const fetchFavouriteCampaigns = async () => {
        try {
            const response: IFavouriteCampaignResponse = await fetchFavouriteCampaignsAction({
                limit: favorites.limit,
                page: favorites.page,
                order: favorites.order,
                orderBy: favorites.orderBy,
                search: favorites.search,
            }).unwrap();
            setFavorites((prev) => ({ ...prev, data: response.data, total_count: response.total_count }));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };
    const handleNext = () =>
        setFavorites((prev) => {
            if ((prev.page + 1) * prev.limit < prev.total_count) return { ...prev, page: prev.page + 1 };
            return prev;
        });
    const handlePrev = () =>
        setFavorites((prev) => {
            if (prev.page > 0) return { ...prev, page: prev.page - 1 };
            return prev;
        });
    const handleSortAscendingByTitle = () => setFavorites((prev) => ({ ...prev, order: "asc", orderBy: "alphabet" }));
    const handleSortDescendingByTitle = () => setFavorites((prev) => ({ ...prev, order: "desc", orderBy: "alphabet" }));
    const handleSortAscendingByDate = () => setFavorites((prev) => ({ ...prev, order: "asc", orderBy: "date" }));
    const handleSortDescendingByDate = () => setFavorites((prev) => ({ ...prev, order: "desc", orderBy: "date" }));
    const handleSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setFavorites((prev) => ({ ...prev, search: value }));

    return {
        handlePrev,
        handleNext,
        handleSortDescendingByDate,
        handleSortAscendingByDate,
        handleSortAscendingByTitle,
        handleSortDescendingByTitle,
        navigate,
        handleSearch,
        favorites,
        isLoading,
    };
}
