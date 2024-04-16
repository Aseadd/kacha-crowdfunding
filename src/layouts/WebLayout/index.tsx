import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRefreshTokenMutation } from "src/api/data";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import { ProtectedRoutes, RouteName } from "src/constants/routes";
import { useNotificationContext } from "src/context/NotificationContext";
import { IRefreshTokenResponse } from "src/model/auth";
import { resetAuth, selectAuth } from "src/store/states/auth";
import Helper from "src/utilities/helper";

class RefreshToken {
    static cronJob: null | any = null;
}

export default function WebLayout() {
    const auth = useSelector(selectAuth);
    const [refreshTokenApi] = useRefreshTokenMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { showError } = useNotificationContext();

    useEffect(() => {
        if (auth.isLoggedIn) startCronJob();
        else clearCronJob();
        // eslint-disable-next-line
    }, [auth]);

    const refreshToken = async () => {
        const refreshToken = Helper.getRefreshToken();
        if (auth.isLoggedIn) {
            if (refreshToken) {
                try {
                    const [{ access_token, refresh_token }]: IRefreshTokenResponse = await refreshTokenApi(refreshToken).unwrap();
                    if (access_token && refresh_token) Helper.storeCredential({ refresh_token, access_token });
                    else logout();
                } catch (error) {
                    console.log(error);
                    logout();
                }
            } else logout();
        } else {
            clearCronJob();
            Helper.clearCredentials();
        }
    };

    const logout = () => {
        showError({ message: "Token expired. Please login again." });
        if (ProtectedRoutes.includes(location.pathname)) navigate(RouteName.Home, { replace: true });
        dispatch(resetAuth());
        clearCronJob();
        Helper.clearCredentials();
    };

    const startCronJob = () => {
        RefreshToken.cronJob = setInterval(() => refreshToken(), 1200000);
    };

    const clearCronJob = () => {
        if (RefreshToken.cronJob) clearInterval(RefreshToken.cronJob);
    };

    return (
        <div className="w-full min-h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
