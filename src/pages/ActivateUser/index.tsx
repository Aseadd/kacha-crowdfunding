import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActivateMutation, useGetUserMutation } from "src/api/data";
import ErrorIcon from "src/components/Icons/ErrorIcon";
import { useNotificationContext } from "src/context/NotificationContext";
import { ILoginResponse, IUserResponse } from "src/model/auth";
import { setAuthLogin, setAuth } from "src/store/states/auth";
import Helper from "src/utilities/helper";

export default function ActivateUser() {
    const [error, setError] = useState<string>()
    const [searchParams] = useSearchParams();
    const { showError, showSuccess } = useNotificationContext()
    const [activateUserAction,] = useActivateMutation()
    const [getUserInfo] = useGetUserMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get("token"))
            verifyToken();
        else {
            showError({ message: "Sorry token was't provided" });
            setError("Sorry token was't provided");
        }
        // eslint-disable-next-line 
    }, [])

    const verifyToken = async () => {
        try {

            const response: ILoginResponse = await activateUserAction(searchParams.get("token")!).unwrap();
            if (response.refresh_token && response.access_token) {
                showSuccess({ message: "Account successfully activated" });
                const { access_token, refresh_token } = response;
                Helper.storeCredential({ access_token, refresh_token });
                dispatch(setAuthLogin());
                fetchUserInfo();
                navigate("/");
            } else {
                showError({ message: response?.message ?? "Network error" });
                setError(response?.message ?? "Something went wrong")
            }
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
            setError(error?.data?.detail ?? "Something went wrong")
        }
    }

    const fetchUserInfo = async () => {
        try {
            const { data }: IUserResponse = await getUserInfo(Helper.userId() ?? "").unwrap();
            if (data) dispatch(setAuth(data));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
        }
    };

    return <div className="w-full flex flex-col py-10 px-5 gap-y-8 min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="w-full flex justify-center items-center p-10 flex-col gap-y-8">
            {
                error ?
                    <>
                        <p className="text-xl font-semibold text-primary">{error}</p>
                        <ErrorIcon />
                    </>
                    :
                    <>
                        <Spin tip="" size="large"></Spin>
                        <p className="text-base font-bold">Verifing...</p>
                    </>
            }
        </div>
    </div>
}
