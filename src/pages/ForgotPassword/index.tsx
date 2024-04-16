import { Button } from "antd";
import { Link } from "react-router-dom";
import ConfirmEmail from "src/components/Icons/ConfirmEmailIcon";
import useForgotPassword from "src/hooks/useForgotPassword";

export default function ForgotPassword() {
    const { onSubmit, isLoading, data, } = useForgotPassword()

    return <div className="w-full flex flex-col py-10 px-5 gap-y-8 min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="w-full flex justify-center items-center p-10 flex-col gap-y-8 text-center">
            <div className="w-full px-1 py-2">
                <div className="w-full max-w-[480px] mx-auto">
                    <div className="w-full flex justify-center items-center">
                        <ConfirmEmail />
                    </div>
                    <div className="w-full flex flex-col gap-y-8">
                        <div className="w-full flex flex-col gap-y-8">
                            <h1 className="text-secondary text-base xs:text-[32px] font-medium">Confirm your email address</h1>
                            <div className="w-full text-center text-[#87898E] text-sm xs:text-base font-normal">
                                <p>
                                    We have sent an email to <span className="text-secondary">{data?.email}</span>.
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
                        <Link
                            to={"/"}
                            className="outline-none mx-auto bg-white text-[#23262F] text-sm xs:text-base font-normal">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
