export interface ICategory {
    _id: string;
    name: string;
    count: number;
    checked: boolean;
}

export interface ICategoryResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: ICategory[];
}
