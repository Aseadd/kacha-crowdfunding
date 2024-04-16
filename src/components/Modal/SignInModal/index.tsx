import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckboxInput from "src/components/Form/CheckboxInput";
import PasswordInput from "src/components/Form/PasswordInput";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import { ILoginResponse, ISignInInput, IUserResponse } from "src/model/auth";
import signInValidator from "src/validator/signIn";
import { useGetUserMutation, useLoginMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setAuthLogin } from "src/store/states/auth";
import Helper from "src/utilities/helper";
import EmailInput from "src/components/Form/EmailInput";
import { closeLoginModal, openForgotPasswordModal, openSignUpModal, selectLoginModal } from "src/store/states/modal";

export default function SignInModal() {
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm<ISignInInput>({ resolver: yupResolver(signInValidator) });
    const [login, { isLoading }] = useLoginMutation();
    const [getUserInfo] = useGetUserMutation();
    const { showError, showSuccess } = useNotificationContext();
    const open = useSelector(selectLoginModal);

    const onSubmit = async (input: ISignInInput) => {
        try {
            const form = new FormData();
            form.append("email", input.email);
            form.append("password", input.password);
            const { refresh_token, access_token, message }: ILoginResponse = await login(form).unwrap();
            if (access_token && refresh_token) {
                showSuccess({ message: "Successfully logged in" });
                Helper.storeCredential({ access_token, refresh_token });
                handleClose();
                dispatch(setAuthLogin());
                fetchUserInfo();
            } else showError({ message: message ?? "Something went wrong. Please retry again" });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    const fetchUserInfo = async () => {
        try {
            const { data }: IUserResponse = await getUserInfo(Helper.userId() ?? "").unwrap();
            if (data) dispatch(setAuth(data));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };
    const handleClose = () => dispatch(closeLoginModal());
    const handleOpenSignUp = () => dispatch(openSignUpModal());
    const handleOpenForgotPassword = () => dispatch(openForgotPasswordModal());

    return (
        <Modal open={open} closable={false} closeIcon={null} footer={null} centered>
            <div className="py-1 xs:px-2">
                <div className="w-full max-w-[407px] mx-auto flex flex-col gap-y-6 md:gap-y-[30px]">
                    <div className="flex justify-end">
                        <button className="outline-none" onClick={handleClose}>
                            <RoundedCloseIcon />
                        </button>
                    </div>
                    <h1 className="text-secondary text-2xl md:text-[32px] font-medium text-center">Sign In</h1>
                    <div className="flex flex-col gap-y-8 w-full">
                        <EmailInput control={control} placeholder="Enter your email" name="email" />
                        <PasswordInput name="password" control={control} placeholder="Enter your password" />
                        <div className="flex justify-between items-center">
                            <CheckboxInput control={control} name="remember">
                                <span className="text-[#87898E] text-sm xs:text-base font-normal">Remember me</span>
                            </CheckboxInput>
                            <button
                                onClick={handleOpenForgotPassword}
                                className="outline-none text-secondary text-sm xs:text-base font-normal whitespace-nowrap">
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            type="primary"
                            loading={isLoading}
                            onClick={handleSubmit(onSubmit)}
                            className="h-12 md:h-14 bg-primary flex items-center justify-center text-base md:text-xl font-semibold text-white rounded-[50px] w-full hover:text-white">
                            Sign in
                        </Button>
                        <div className="flex p-4 justify-center items-center text-sm font-normal gap-x-1">
                            <span className="text-black">Don’t Have a Account? </span>{" "}
                            <button onClick={handleOpenSignUp} className="text-secondary outline-none">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
