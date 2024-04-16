import { Button, Checkbox } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import { RouteName } from "src/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { botLogin } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IBotSignInInput } from "src/model/auth";
import PasswordInput from "src/components/Form/PasswordInput";
import { useState } from "react";
import { botSignInValidator } from "src/validator/signIn";
import ForgotPasswordModal from "src/components/Modal/ForgotPasswordModal";
import { openForgotPasswordModal } from "src/store/states/modal";
import { useDispatch } from "react-redux";

export default function SignIn() {
    const { control, handleSubmit } = useForm<IBotSignInInput>({ resolver: yupResolver(botSignInValidator) });
    const [loading, setLoading] = useState<boolean>(false);
    const { showError, showSuccess } = useNotificationContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { phone } = useParams();

    const onSubmit = async ({ password }: IBotSignInInput) => {
        setLoading(true);
        try {
            const response = await botLogin({ password, phone: `+${phone}` });
            showSuccess({ message: response.message });
            navigate(RouteName.BotWhatsappSuccess, { state: { phone, message: "Successfully Logged in" } });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? error?.detail ?? "Network error" });
        }
        setLoading(false);
    };
    const handleOpenForgotPassword = () => dispatch(openForgotPasswordModal());

    return (
        <div className="w-full min-screen bg-white bg-no-repeat bg-cover bot-sign-bg-img">
            <div className="w-full max-w-[1200px] mx-auto py-8 px-3 xs:px-9 min-h-screen">
                <div className="w-full">
                    <img src={logo} alt="logo" className="w-[98px] xs:w-[145px] h-10 xs:h-[52px]" width={145} height={52} />
                </div>
                <div className="w-full pt-24">
                    <div className="w-full min-h-full py-4 xs:px-4 flex justify-center items-center">
                        <div className="w-full max-w-[500px] rounded-[27.582px] sign-card">
                            <div className="w-full flex items-center flex-col pt-[73px] pb-[84px] gap-y-[30px] rounded-[27.582px]">
                                <div className="w-full text-center text-[#FFC820] font-medium text-2xl xs:leading-8 md:text-[32px] md:leading-10">
                                    Sign In
                                </div>

                                <div className="w-full max-w-[300px] flex flex-col gap-y-4">
                                    <PasswordInput control={control} placeholder="Enter your password" name="password" />
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <Checkbox name="remember">
                                                <span className="text-sm md:text-base text-[#87898E]">Remember me</span>
                                            </Checkbox>
                                        </div>
                                        <button
                                            onClick={handleOpenForgotPassword}
                                            className="text-sm md:text-base text-[#FFC820] outline-none">
                                            Forgot password
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-4 justify-center items-center gap-y-4">
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        loading={loading}
                                        className="max-w-[276px] hover-white w-full text-center rounded-[50px] bg-[#DB5E00] text-white h-10">
                                        Sign in
                                    </Button>
                                    <div className="flex justify-center items-center gap-2 text-sm md:text-base">
                                        <div>Don't have an account yet?</div>
                                        <Link
                                            className="text-sm md:text-base text-[#FFC820] font-bold hover:text-orange-500"
                                            to={`${RouteName.BotWhatsappSignUpRoute}/${phone}`}>
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal />
        </div>
    );
}
