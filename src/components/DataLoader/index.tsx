import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useCategoriesMutation, useGetUserMutation, useRefreshTokenMutation, useTagsMutation } from "src/api/data";
import { ProtectedRoutes, RouteName } from "src/constants/routes";
import { IRefreshTokenResponse, IUserResponse } from "src/model/auth";
import { resetAuth, setAuth, setAuthLogin } from "src/store/states/auth";
import Helper from "src/utilities/helper";
import kacha from "src/assets/images/kacha.jpg";
import { ICategoryResponse } from "src/model/category";
import { setCategory } from "src/store/states/category";
import { ITagResponse } from "src/model/tag";
import { setTag } from "src/store/states/tag";
import { useNotificationContext } from "src/context/NotificationContext";

export default function DataLoader() {
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshTokenApi] = useRefreshTokenMutation();
    const [getUserInfo] = useGetUserMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [fetchCategoryAction] = useCategoriesMutation();
    const [fetchTagAction] = useTagsMutation();
    const { showError } = useNotificationContext();

    useEffect(() => {
        fetchCategory();
        fetchTag();
        if (Helper.isRefreshTokenExpired()) logout();
        else refreshToken();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname]);

    const fetchCategory = async () => {
        try {
            const response: ICategoryResponse = await fetchCategoryAction("").unwrap();
            dispatch(setCategory(response.data));
        } catch (error) {}
    };

    const fetchTag = async () => {
        try {
            const response: ITagResponse = await fetchTagAction("").unwrap();
            dispatch(setTag(response.data));
        } catch (error) {}
    };

    const refreshToken = async () => {
        const refreshToken = Helper.getRefreshToken();
        if (refreshToken) {
            try {
                const [{ access_token, refresh_token }]: IRefreshTokenResponse = await refreshTokenApi(refreshToken).unwrap();
                if (access_token && refresh_token) {
                    Helper.storeCredential({ refresh_token, access_token });
                    login();
                } else logout();
            } catch (error) {
                logout();
            }
        } else logout();
    };

    const login = () => {
        dispatch(setAuthLogin());
        setLoading(false);
        fetchUserInfo();
    };

    const fetchUserInfo = async () => {
        try {
            const { data }: IUserResponse = await getUserInfo(Helper.userId() ?? "").unwrap();
            if (data) dispatch(setAuth(data));
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? "Network error" });
            logout();
        }
    };

    const logout = () => {
        dispatch(resetAuth());
        if (ProtectedRoutes.includes(location.pathname)) navigate(RouteName.Home, { replace: true });
        Helper.clearCredentials();
        setLoading(false);
    };

    if (loading)
        return (
            <div className="w-full min-h-screen h-full py-10 flex items-center">
                <div className="w-full flex justify-center items-center">
                    <Spin tip="" size="large">
                        <img src={kacha} alt="" className="max-h-[300px] h-full w-auto" />
                    </Spin>
                </div>
            </div>
        );
    else
        return (
            <div className="w-full">
                <Outlet />
            </div>
        );
}
