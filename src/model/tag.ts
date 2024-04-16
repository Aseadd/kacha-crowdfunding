export interface ITag {
    _id: string;
    name: string;

    count: number;
    checked: boolean;
}
export interface ITagResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: ITag[];
}
