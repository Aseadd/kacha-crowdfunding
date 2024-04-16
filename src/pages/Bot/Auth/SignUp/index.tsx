import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import { RouteName } from "src/constants/routes";
import CheckboxInput from "src/components/Form/CheckboxInput";
import EmailInput from "src/components/Form/EmailInput";
import NormalInput from "src/components/Form/NormalInput";
import PasswordInput from "src/components/Form/PasswordInput";
import LightLocationIcon from "src/components/Icons/LightLocationIcon";
import LightPersonIcon from "src/components/Icons/LightPersonIcon";
import LightWarningIcon from "src/components/Icons/LightWarningIcon";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { botRegister } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IBotSignUpInput, IBotSignUpInputData } from "src/model/auth";
import { botSignUpValidator } from "src/validator/signUp";
import { Button } from "antd";
import Helper from "src/utilities/helper";

export default function SignUp() {
    const { control, handleSubmit } = useForm<IBotSignUpInput>({ resolver: yupResolver(botSignUpValidator) });
    const [loading, setLoading] = useState<boolean>(false);
    const { showError, showSuccess } = useNotificationContext();
    const navigate = useNavigate();
    const { phone } = useParams();

    const onSubmit = async (input: IBotSignUpInput) => {
        setLoading(true);
        const fullName = Helper.disperseFullName(input.fullName);
        const data: IBotSignUpInputData = {
            ...fullName,
            phone: `+${phone}`,
            email: input.email,
            password: input.password,
            password_confirmation: input.password_confirmation,
            address: input.address,
        };
        try {
            const response = await botRegister(data);
            showSuccess({ message: response.message });
            navigate(RouteName.BotWhatsappSuccess, { state: { phone, message: "Successfully Registered" } });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? error?.detail ?? "Network error" });
        }
        setLoading(false);
    };

    return (
        <div className="w-full min-screen bg-white bg-no-repeat bg-cover bot-sign-up-bg-img">
            <div className="w-full max-w-[1200px] mx-auto py-8 px-3 xs:px-9 min-h-screen">
                <div className="w-full">
                    <img src={logo} alt="logo" className="w-[98px] xs:w-[145px] h-10 xs:h-[52px]" width={145} height={52} />
                </div>
                <div className="w-full pt-24">
                    <div className="w-full min-h-full py-4 xs:px-4 flex justify-center items-center">
                        <div className="w-full max-w-[500px] rounded-[27.582px] sign-card">
                            <div className="w-full flex items-center flex-col pt-14 xs:pt-[73px] pb-[84px] gap-y-[30px] rounded-[27.582px]">
                                <div className="w-full text-center text-[#FFC820] font-medium text-2xl xs:leading-8 md:text-[32px] md:leading-10">
                                    Sign Un
                                </div>

                                <div className="w-full max-w-[300px] flex flex-col gap-y-4">
                                    <NormalInput
                                        control={control}
                                        name="fullName"
                                        type="text"
                                        prefix={
                                            <span className="pr-1">
                                                <LightPersonIcon />
                                            </span>
                                        }
                                        placeholder="Full name"
                                    />
                                    <NormalInput
                                        control={control}
                                        name="address"
                                        type="text"
                                        prefix={
                                            <span className="pr-1">
                                                <LightLocationIcon />
                                            </span>
                                        }
                                        placeholder="Address"
                                    />
                                    <EmailInput control={control} name="email" placeholder="Enter your email" />
                                    <div className="w-full flex flex-col gap-y-4">
                                        <PasswordInput control={control} name="password" placeholder="Enter your password" />
                                        <div className="flex justify-start items-center gap-x-2">
                                            <LightWarningIcon />
                                            <p className="text-[#87898E] text-xs font-normal">
                                                Minimum 6 characters, at least one number, and special character
                                            </p>
                                        </div>
                                    </div>
                                    <PasswordInput control={control} name="password_confirmation" placeholder="Confirm password" />
                                    <CheckboxInput control={control} name="accept_term">
                                        <p className="text-sm font-normal">
                                            <span className="text-black">I have read, understood and accept the </span>{" "}
                                            <Link
                                                to={RouteName.TermsConditions}
                                                className="hover:text-orange-500 text-secondary outline-none">
                                                Terms and Conditions
                                            </Link>
                                        </p>
                                    </CheckboxInput>
                                    <CheckboxInput control={control} name="accept_policy">
                                        <p className="text-sm font-normal">
                                            <span className="text-black">I have read, understood and accept the </span>{" "}
                                            <Link
                                                to={RouteName.PolicyPrivacy}
                                                className="hover:text-orange-500 text-secondary outline-none">
                                                Privacy Policy
                                            </Link>
                                        </p>
                                    </CheckboxInput>
                                </div>
                                <div className="w-full flex flex-col gap-4 justify-center items-center gap-y-4">
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        loading={loading}
                                        className="max-w-[276px] hover-white w-full text-center rounded-[50px] bg-[#DB5E00] text-white h-10">
                                        Sign up
                                    </Button>
                                    <div className="flex justify-center items-center gap-2 text-sm md:text-base">
                                        <div>Already have an account? </div>
                                        <Link
                                            className="text-sm md:text-base text-[#FFC820] font-bold"
                                            to={`${RouteName.BotWhatsappSignInRoute}/${phone}`}>
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
