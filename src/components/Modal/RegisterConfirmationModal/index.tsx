import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useReSendActivationEmailMutation } from "src/api/data";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import ConfirmEmail from "src/components/Icons/ConfirmEmailIcon";
import { useNotificationContext } from "src/context/NotificationContext";
import { selectActivationToken, selectRegisterEmail, setRegisterEmailAndToken } from "src/store/states/auth";
import { closeRegisterConfirmModal, selectRegisterConfirmModal } from "src/store/states/modal";
import { IResendActivateEmailResponse } from "src/model/auth";

export default function RegisterConfirmationModal() {
    const token = useSelector(selectActivationToken)
    const { showError, showSuccess } = useNotificationContext();
    const [resendActivationAction, { isLoading }] =
        useReSendActivationEmailMutation();
    const email = useSelector(selectRegisterEmail);
    const open = useSelector(selectRegisterConfirmModal);
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            const response: IResendActivateEmailResponse =
                await resendActivationAction(token!).unwrap();
            if (response.status_code === 200) {
                showSuccess({ message: response.message });
                dispatch(setRegisterEmailAndToken({ token: response.data.resend_token }));
            } else {
                showError({ message: response?.message ?? "Network error" });
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };
    const handleClose = () => dispatch(closeRegisterConfirmModal());

    return (
        <Modal open={open} footer={null} closeIcon={null} centered width={"100%"} style={{ maxWidth: "585px" }}>
            <div className="w-full px-1 py-2">
                <div className="w-full max-w-[480px] mx-auto">
                    <div className="w-full flex justify-end items-center">
                        <button className="outline-none" onClick={handleClose}>
                            <RoundedCloseIcon />
                        </button>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <ConfirmEmail />
                    </div>
                    <div className="w-full flex flex-col gap-y-8">
                        <div className="w-full flex flex-col gap-y-8">
                            <h1 className="text-secondary text-base xs:text-[32px] font-medium">Confirm your email address</h1>
                            <div className="w-full text-center text-[#87898E] text-sm xs:text-base font-normal">
                                <p>
                                    We have sent an email to <span className="text-secondary">{email}</span>.
                                </p>
                                <p>Check your email and click on the confirmation link to continue.</p>
                            </div>
                        </div>
                        <Button
                            loading={isLoading}
                            onClick={onSubmit}
                            className="w-full bg-primary h-10 xs:h-14 text-center flex justify-center items-center rounded-[50px] max-w-[284px] mx-auto">
                            <span className="text-[#FCFCFD] text-sm xs:text-[20px] font-semibold ">Resend email</span>
                        </Button>
                    </div>
                    <div className="w-full flex flex-col py-4 justify-center items-center">
                        <button
                            onClick={handleClose}
                            className="outline-none mx-auto bg-white text-[#23262F] text-sm xs:text-base font-normal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
