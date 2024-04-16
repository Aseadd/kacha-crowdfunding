import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJengaWebhookMutation } from "src/api/data";
import { IMasterCardWebhookResponse, IMasterCardWebhookResponseData } from "src/model/donate";
import SuccessIcon from "src/components/Icons/SuccessIcon";
import ErrorIcon from "src/components/Icons/ErrorIcon";

export default function DonationConfirmJenga() {
    const [message, setMessage] = useState<string[]>();
    const [success, setSuccess] = useState<IMasterCardWebhookResponseData>();
    const [searchParams] = useSearchParams();
    const [jengaWebhookAction, { isLoading }] = useJengaWebhookMutation();

    useEffect(() => {
        checkData();
        // eslint-disable-next-line
    }, [searchParams]);

    const checkData = async () => {
        const responseStatus =
            searchParams.get("responseStatus") === "true" ? true : searchParams.get("responseStatus") === "false" ? false : null;
        const transactionStatus = searchParams.get("transactionStatus");
        const orderReference = searchParams.get("orderReference");
        const transactionReference = searchParams.get("transactionReference");
        if (responseStatus !== undefined && responseStatus !== null && transactionReference && orderReference && transactionStatus) {
            try {
                const { response, detail, error, message }: IMasterCardWebhookResponse = await jengaWebhookAction({
                    orderReference,
                    responseStatus,
                    transactionReference,
                    transactionStatus,
                }).unwrap();
                if (Number(response?.status_code) === 200 || Number(error?.status_code) === 200) {
                    setSuccess(error?.amount ? (error as any) : response);
                } else {
                    if (detail) {
                        setMessage([detail]);
                    } else if (error?.detail) {
                        setMessage([error.detail]);
                    } else if (message) {
                        setMessage([message]);
                    } else {
                        const temp = Object.keys((response as any).message).map(
                            (key) => `${key}: ${(response as any).message[key].join(", ")}`
                        );
                        setMessage(temp);
                    }
                }
            } catch (error: any) {
                if (error?.data?.detail) {
                    setMessage([error.data.detail]);
                } else if (error?.error?.detail) {
                    setMessage([error.error.detail]);
                }
            }
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-64px)]">
            <div className="w-full flex h-full justify-center items-center p-10 mx-auto">
                {isLoading ? (
                    <Spin tip="" size="large"></Spin>
                ) : (
                    <div className="w-full text-sm md:text-base text-center text-black font-normal">
                        {success ? (
                            <div className="flex flex-col gap-y-6 text-sm xs:text-base md:text-lg font-semibold m-auto w-fit h-auto">
                                {success.name && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Name: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.name}</p>
                                    </div>
                                )}
                                {success.settlement_amount && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Settlement Amount: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.settlement_amount}</p>
                                    </div>
                                )}
                                {success.account && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Amount: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.account}</p>
                                    </div>
                                )}
                                {success.currency && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Currency: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.currency}</p>
                                    </div>
                                )}

                                {success.reference && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Reference: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.reference}</p>
                                    </div>
                                )}
                                {success.trace_number && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Trace Number: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.trace_number}</p>
                                    </div>
                                )}
                                {success.account && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Account: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.account}</p>
                                    </div>
                                )}
                                {success.reason && (
                                    <div className="flex items-center justify-between gap-x-4">
                                        <p className="text[#23262F]">Reason: </p>
                                        <p className="text-[#000000b3] text-sm xs:text-base">{success.reason}</p>
                                    </div>
                                )}
                                <div className="flex items-center relative">
                                    <SuccessIcon />
                                    <p className="text-primary absolute max-w-[50%] right-0">Operation Completed Successfully</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col gap-y-6">
                                {Array.isArray(message) ? (
                                    message.map((value, index) => (
                                        <p className="text-black text-xl font-bold leading-10 text-center" key={index}>
                                            {value}
                                        </p>
                                    ))
                                ) : (
                                    <h1 className="text-black text-3xl font-bold leading-10 text-center">Can't find Jenga Transaction</h1>
                                )}
                                <div className="w-auto relative flex justify-center items-center">
                                    <ErrorIcon />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
