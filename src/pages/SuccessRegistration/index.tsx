import { Button } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useReSendActivationEmailMutation } from "src/api/data";
import ConfirmEmail from "src/components/Icons/ConfirmEmailIcon";
import { useNotificationContext } from "src/context/NotificationContext";
import { IResendActivateEmailResponse } from "src/model/auth";

export default function SuccessRegistration() {
    const state = useLocation().state;
    const [token, setToken] = useState<string>(state.token);
    const { showError, showSuccess } = useNotificationContext();
    const [resendActivationAction, { isLoading }] =
        useReSendActivationEmailMutation();

    const handleOnClick = async () => {
        try {
            const response: IResendActivateEmailResponse =
                await resendActivationAction(token).unwrap();
            if (response.status_code === 200) {
                showSuccess({ message: response.message });
                setToken(response.data.resend_token);
            } else {
                showError({ message: response?.message ?? "Network error" });
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    return (
        <div className="w-full mx-auto flex flex-col py-10 px-5 gap-y-8 min-h-[calc(100vh-64px)] items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <ConfirmEmail />
                <div className="w-full flex flex-col text-center gap-y-8">
                    <h1 className="text-secondary text-3xl font-normal">
                        Confirm your email address
                    </h1>
                    <p className="text-[#87898E] text-base font-normal">
                        We have sent an email to{" "}
                        <span className="text-secondary">{"youremail@email.com"}</span>{" "}
                        <br /> Check your email and click on the confirmation link to
                        continue.
                    </p>

                    <Button
                        type="primary"
                        onClick={handleOnClick}
                        loading={isLoading}
                        className="bg-primary rounded-[20px] py-5 max-w-[284px] w-full text-base px-10 h-auto text-[#FCFCFD] font-normal"
                    >
                        Resend email
                    </Button>
                </div>
                ;
            </div>
        </div>
    );
}
