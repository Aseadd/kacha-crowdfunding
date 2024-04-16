import { Button, Spin } from "antd";
import PasswordInput from "src/components/Form/PasswordInput";
import ErrorIcon from "src/components/Icons/ErrorIcon";
import LightWarningIcon from "src/components/Icons/LightWarningIcon";
import useResetPassword from "src/hooks/useResetPassword";

export default function ResetPassword() {
    const { control, handleSubmit, onSubmit, isLoading, error, loading } = useResetPassword()

    return <div className="w-full flex flex-col py-10 px-5 gap-y-8 min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="w-full flex justify-center items-center p-10 flex-col gap-y-8">
            {loading ?
                <>
                    <Spin tip="" size="large"></Spin>
                    <p className="text-base font-bold">Verifing...</p>
                </> :
                error ?
                    <>
                        <p className="text-xl font-semibold text-primary">{error}</p>
                        <ErrorIcon />
                    </>
                    :
                    <div className="flex flex-col gap-y-8 w-full max-w-[407px]">
                        <h1 className="text-center text-[#23262F] text-2xl font-medium">Reset Password</h1>
                        <div className="w-full flex flex-col gap-y-6">
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
                            <span className="text-[#FCFCFD] text-[20px] font-semibold ">Reset password</span>
                        </Button>
                    </div>
            }

        </div>
    </div>
}
