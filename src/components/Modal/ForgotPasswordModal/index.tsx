import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "src/api/data";
import EmailInput from "src/components/Form/EmailInput";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import { RouteName } from "src/constants/routes";
import { useNotificationContext } from "src/context/NotificationContext";
import { IForgotPasswordInput, IForgotPasswordResponse } from "src/model/auth";
import { closeForgotPasswordModal, selectForgotPasswordModal } from "src/store/states/modal";
import forgotPasswordValidator from "src/validator/forgotPassword";

export default function ForgotPasswordModal() {
    const dispatch = useDispatch();
    const [resetPasswordAction, { isLoading }] = useResetPasswordMutation();
    const { showError, showSuccess } = useNotificationContext();
    const { control, handleSubmit } = useForm<IForgotPasswordInput>({ resolver: yupResolver(forgotPasswordValidator) });
    const open = useSelector(selectForgotPasswordModal);
    const navigate = useNavigate()

    const onSubmit = async (input: IForgotPasswordInput) => {
        try {
            const response: IForgotPasswordResponse = await resetPasswordAction(input.email).unwrap();
            if (response.status_code === 200) {
                showSuccess({ message: response.message });
                navigate(RouteName.FogotPassword, { state: { email: input.email, token: response.data.resend_token } })
                handleClose();
            } else {
                showError({ message: response?.message ?? "Network error" });
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };
    const handleClose = () => dispatch(closeForgotPasswordModal());

    return (
        <Modal open={open} footer={null} closeIcon={null} centered width={"100%"} style={{ maxWidth: "544px" }}>
            <div className="w-full px-1 py-2">
                <div className="w-full max-w-[410px] mx-auto flex flex-col gap-y-[30px]">
                    <div className="w-full flex justify-end items-center">
                        <button className="outline-none" onClick={handleClose}>
                            <RoundedCloseIcon />
                        </button>
                    </div>
                    <div className="w-full flex flex-col gap-y-8">
                        <h1 className="text-secondary text-lg xs:text-2xl font-medium">Reset Password?</h1>
                    </div>
                    <div className="w-full flex flex-col gap-y-6">
                        <p className="text-[#87898E] text-sm xs:text-base font-normal">We will send you a reset link</p>
                        <EmailInput name="email" control={control} placeholder="Enter your email" />
                    </div>
                    <div className="w-full flex flex-col gap-y-6">
                        <Button
                            loading={isLoading}
                            onClick={handleSubmit(onSubmit)}
                            className="w-full bg-primary h-10 xs:h-14 text-center flex justify-center items-center rounded-[50px]">
                            <span className="text-[#FCFCFD] text-sm xs:text-[20px] font-semibold ">Send</span>
                        </Button>
                        <button onClick={handleClose} className="outline-none bg-white text-[#23262F] text-sm xs:text-base font-normal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
