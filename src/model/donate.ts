import { ICategory } from "./category";

export interface IDonateInputData {
    comment?: string | null | undefined;
    currency: string;
    amount: number;
    payment_method: string;
    isAnonymous: NonNullable<boolean | undefined>;
}

export interface IDonateInput {
    grantee_id: string;
    campaign_id: string;
    isAnonymous: boolean;
    comment: string | null;
    amount: number;
    currency: string;
    pay_via: string;
}

export interface ICheckout {
    loading: boolean;
    data?: any;
}

export enum PayViaType {
    JENGA = "JENGA",
    MASTERCARD = "MASTERCARD",
    VISA = "VISA",
}

export interface IMasterCardWebhookInput {
    resultIndicator: string;
    sessionVersion: string;
}

export interface IJengaWebhookInput {
    responseStatus: boolean;
    transactionStatus: string;
    orderReference: string;
    transactionReference: string;
}

export interface IMasterCardWebhookResponse {
    message: "Invalid transaction reference number!!!";
    error: {
        status: string;
        status_code: string;
        message: string;
        detail: string;
        trace_number: string;
        reference: string;
        bank: null;
        account: string;
        name: string;
        amount: number;
        currency: string;
        settlement_amount: string;
        reason: string;
    };
    detail: string;
    response: IMasterCardWebhookResponseData;
}

export interface IMasterCardWebhookResponseData {
    reference: string;
    bank: null | string;
    account: string;
    name: string;
    amount: number;
    currency: string;
    settlement_amount: string;
    reason: string;
    trace_number: string;
    status: string;
    status_code: number;
    message: string;
    detail: string;
}

export interface IMasterCardWebhookErrorResponse {
    response: {
        status: string;
        status_code: string;
        message: { [key: string]: string[] };
    };
}

export interface IDonateResponse {
    status_code: number;
    status: string;
    message: string;
    error?: {
        data?: { detail: string };
    };
    data: {
        status: string;
        session_id: string;
        merchantID: string;
        reference_number: string;
        amount: number;
        success_indicator: string;
        result: string;
        update_status: string;
        version: string;
    };
}

export interface IDonateFilterInput {
    categories: ICategory[];
    fromDate?: Date;
    toDate?: Date;
    minAmount?: number;
    maxAmount?: number;
}
export interface IDonateQuery {
    limit: number;
    page: number;
    categoriesId?: string[];
    fromDate?: Date;
    toDate?: Date;
    minAmount?: number;
    maxAmount?: number;
}
