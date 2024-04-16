import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "src/api/data";
import PasswordInput from "src/components/Form/PasswordInput";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import LightWarningIcon from "src/components/Icons/LightWarningIcon";
import { useNotificationContext } from "src/context/NotificationContext";
import { IChangePasswordInput, IChangePasswordResponse } from "src/model/auth";
import changePasswordValidator from "src/validator/changePassword";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function ChangePasswordModal({ handleClose, open }: IProps) {
    const [changePasswordAction, { isLoading }] = useChangePasswordMutation();
    const { showError, showSuccess } = useNotificationContext();
    const { control, handleSubmit } = useForm<IChangePasswordInput>({ resolver: yupResolver(changePasswordValidator) });

    const onSubmit = async (input: IChangePasswordInput) => {
        try {
            const data: IChangePasswordResponse = await changePasswordAction(input).unwrap();
            if (data.status_code < 300) {
                showSuccess({ message: data.message });
                handleClose();
            } else
                showError({ message: data.message });

        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    return (
        <Modal open={open} footer={null} closeIcon={null} centered width={"100%"} style={{ maxWidth: "544px" }}>
            <div className="w-full py-1 px-2 flex flex-col gap-y-8">
                <div className="w-full flex justify-end items-center">
                    <button className="outline-none" onClick={handleClose}>
                        <RoundedCloseIcon />
                    </button>
                </div>
                <div className="flex flex-col gap-y-8 w-full">
                    <h1 className="text-center text-[#23262F] text-2xl font-medium">Change Password</h1>
                    <div className="w-full flex flex-col gap-y-6">
                        <PasswordInput control={control} name="current_password" placeholder="Enter old password" className="text-base" />
                        <div className="w-full flex flex-col gap-y-4">
                            <PasswordInput control={control} name="new_password" placeholder="Enter new password" className="text-base" />
                            <div className="w-full flex items-center gap-x-2">
                                <LightWarningIcon />
                                <p className="text-[#87898E] text-xs font-normal">
                                    Minimum 8 characters, at least one number, and special character
                                </p>
                            </div>
                        </div>
                        <PasswordInput
                            control={control}
                            name="password_confirmation"
                            placeholder="Confirm password"
                            className="text-base"
                        />
                    </div>
                    <Button
                        loading={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full bg-primary h-14 text-center text-[#FCFCFD] text-base font-semibold flex justify-center items-center rounded-[50px] ">
                        <span className="text-[#FCFCFD] text-[20px] font-semibold ">Confirm</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
