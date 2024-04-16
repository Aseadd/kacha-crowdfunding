import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import LightLocationIcon from "src/components/Icons/LightLocationIcon";
import LightPersonIcon from "src/components/Icons/LightPersonIcon";
import LightWarningIcon from "src/components/Icons/LightWarningIcon";
import PhoneInput from "src/components/Form/PhoneInput";
import EmailInput from "src/components/Form/EmailInput";
import PasswordInput from "src/components/Form/PasswordInput";
import { IRegisterInput, IRegisterResponse, ISignUpInput } from "src/model/auth";
import signUpValidator from "src/validator/signUp";
import CheckboxInput from "src/components/Form/CheckboxInput";
import NormalInput from "src/components/Form/NormalInput";
import { useRegisterMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import Helper from "src/utilities/helper";
import { RouteName } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, openLoginModal, openRegisterConfirmModal, selectSignUpModal } from "src/store/states/modal";
import { setRegisterEmailAndToken } from "src/store/states/auth";

export default function SignUpModal() {
    const { control, handleSubmit } = useForm<ISignUpInput>({ resolver: yupResolver(signUpValidator) });
    const [register, { isLoading }] = useRegisterMutation();
    const { showError, showSuccess } = useNotificationContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const open = useSelector(selectSignUpModal);

    const onSubmit = async (input: ISignUpInput) => {
        try {
            const query = convertToRegisterData(input);
            const response: IRegisterResponse = await register(query).unwrap();
            if (response.status_code === 201) {
                showSuccess({ message: response.message });
                dispatch(setRegisterEmailAndToken({ token: response.data.resend_token, email: input.email }));
                dispatch(openRegisterConfirmModal());

            } else {
                showError({ message: response?.message ?? "Network error" });
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    const convertToRegisterData = (input: ISignUpInput): IRegisterInput => {
        const fullName = Helper.disperseFullName(input.fullName);
        return {
            email: input.email,
            password: input.password,
            password_confirmation: input.password_confirmation,
            phone: Helper.formatPhone(input.phone),
            address: input.address,
            ...fullName,
            channel: "WEB",
        };
    };
    const handleNavigateToTermCondition = () => {
        navigate(RouteName.TermsConditions);
        dispatch(closeSignUpModal());
    };
    const handleNavigateToPrivacyPolicy = () => {
        navigate(RouteName.PolicyPrivacy);
        dispatch(closeSignUpModal());
    };
    const handleClose = () => dispatch(closeSignUpModal());
    const handleOpenSignIn = () => dispatch(openLoginModal());

    return (
        <Modal open={open} closable={false} closeIcon={null} footer={null} centered width={"100%"} style={{ maxWidth: "634px" }}>
            <div className="py-1 xs:px-2">
                <div className="flex justify-end">
                    <button className="outline-none" onClick={handleClose}>
                        <RoundedCloseIcon />{" "}
                    </button>
                </div>{" "}
                <div className="w-full max-w-[407px] mx-auto flex flex-col gap-y-5">
                    <h1 className="text-secondary text-2xl md:text-[32px] font-medium text-center">Sign Up</h1>
                    <div className="flex flex-col gap-y-6 w-full">
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
                        <PhoneInput control={control} name="phone" placeholder="Phone number" />
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
                    </div>
                    <div className="flex flex-col w-full gap-y-4">
                        <CheckboxInput control={control} name="accept_term">
                            <p className="text-sm font-normal">
                                <span className="text-black">I have read, understood and accept the </span>{" "}
                                <button onClick={handleNavigateToTermCondition} className="text-secondary outline-none">
                                    Terms and Conditions
                                </button>
                            </p>
                        </CheckboxInput>
                        <CheckboxInput control={control} name="accept_policy">
                            <p className="text-sm font-normal">
                                <span className="text-black">I have read, understood and accept the </span>{" "}
                                <button onClick={handleNavigateToPrivacyPolicy} className="text-secondary outline-none">
                                    Privacy Policy
                                </button>
                            </p>
                        </CheckboxInput>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            type="primary"
                            loading={isLoading}
                            onClick={handleSubmit(onSubmit)}
                            className="h-11 md:h-14 bg-primary flex items-center justify-center text-base md:text-xl font-semibold text-white rounded-[50px] w-full">
                            Sign up
                        </Button>
                        <div className="flex p-4 justify-center items-center text-sm font-normal gap-x-1">
                            <span className="text-black">Already have an account? </span>{" "}
                            <button onClick={handleOpenSignIn} className="text-secondary outline-none">
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
