export interface IComment {
    _id: string;
    campaign_id: string;
    user_id: string;
    comment: string;
    isReply: boolean;
    parent_id: string;
    replies: IComment[];
}

export interface ICommentWithUser {
    _id: string;
    comment: string;
    created_at: string;
    isReply: boolean;
    parent_id: string;
    amount: number;
    isLiked: boolean;
    likes: number;
    user: {
        firstname: string;
        middlename: string;
        profile: null | string;
    };

    replies: ICommentWithUser[];
}

export interface ICommentResponse {
    status_code: number;
    status: string;
    message: string;
    page: number;
    per_page: number;
    total_count: number;
    data: IComment[];
}

export interface ICommentInputData {
    comment: string;
}
export interface ICommentInput extends ICommentInputData {
    campaign_id: string;
    isReply: boolean;
    parent_id?: string | null;
}

export interface ILikeResponse {
    status_code: number;
    status: string;
    message: string;
}
