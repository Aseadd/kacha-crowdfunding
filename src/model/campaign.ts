import { ICategory } from "./category";
import { ICommentWithUser } from "./comment";

export interface ICampaign {
    campaign_id: string;
    tag_id: string;
    target: number;
    currency: string;
    title: string;
    story: string;
    category_id: string;
    campaign_image: string;
    raised: number;
}

export interface ICampaignsResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: ICampaign[];
}

export interface IPagination {
    page: number;
    limit: number;
}

export interface IFavoriteFilterInput {
    page: number;
    limit: number;
    orderBy: string;
    order: string;
    search: string;
}

export interface ICategoryFilterInput {
    page: number;
    limit: number;
    tag_ids: string[];
    category_ids: string[];
    query?: string;
}

export interface IFavoriteCampaign {
    campaign_id: string;
    tag_id: string;
    target: number;
    currency: string;
    title: string;
    story: string;
    category_id: string;
    campaign_image: string;
    raised: number;
    favourite_id: string;
    user_id: string;
}
export interface IFavouriteCampaigns extends IPagination {
    data: IFavoriteCampaign[];
    total_count: number;
    orderBy: string;
    order: string;
    search: string;
}

export interface IFavouriteCampaignResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: IFavoriteCampaign[];
}

export interface ICampaignBio {
    firstname: string;
    middlename: string;
    lastname: string;
    address: string;
    email: string;
    phone: string;
    bio: string;
    bio_image: string;
}

export interface ICampaignFullInfo {
    campaign_id: string;
    grantee_id: string;
    tag_id: string;
    target: number;
    currency: string;
    title: string;
    story: string;
    campaign_image: string;

    raised: number;
    ads: string;

    total_donors: number;
    campaign_bio: ICampaignBio;
    comments: ICommentWithUser[];
    is_favourite: boolean;
    donated: boolean;
    isOwner: boolean;
}
export interface ICampaignResponse {
    status_code: number;
    status: string;
    message: string;
    data: ICampaignFullInfo;
}

export interface IHistory {
    amount: number;
    currency: string;
    campaign_id: string;
    status: string;
    created_at: string;
    updated_at: string;
    category: string;
    cause: string;
}

export interface IHistoriesResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: IHistory[];
}

export interface IHistoryCampaigns {
    page: number;
    per_page: number;
    data: IHistory[];
    total_count: number;
    startPage: number;
    categoriesId?: string[];
    fromDate?: Date;
    toDate?: Date;
    minAmount?: number;
    maxAmount?: number;
}

export interface ICurrency {
    _id: string;
    currency_name: string;
    currency_code: string;
    flag: string;
}

export interface ICurrencyResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: ICurrency[];
}
