import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "src/api/data";
import LogoutIcon from "src/components/Icons/LogoutIcon";
import { AccountRoute } from "src/constants/routes";
import { useNotificationContext } from "src/context/NotificationContext";
import { resetAuth } from "src/store/states/auth";
import Helper from "src/utilities/helper";

export default function AccountLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showSuccess } = useNotificationContext();
    const [logoutAction] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            await logoutAction("").unwrap();
        } catch (_: any) {}
        Helper.clearCredentials();
        dispatch(resetAuth());
        navigate("/");
        showSuccess({ message: "Successfully logged out" });
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex w-full pb-6">
                <div className="max-md:hidden pt-10 border-r border-r-[#CBD4E6] whitespace-nowrap">
                    <div className="w-[246px] flex flex-col justify-between h-full min-h-[calc(100vh-104px)] max-h-[669px]">
                        <div className="flex flex-col gap-y-20 w-full">
                            <h1 className="text-black text-[32px] font-normal">User Profile</h1>
                            <div className="w-full flex flex-col gap-y-3 px-[10px]">
                                {AccountRoute.map((value, index) => (
                                    <NavLink
                                        key={index}
                                        to={value.route}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primary font-bold text-base pb-[9px] border-b-2 border-secondary w-fit"
                                                : "text-[#717B8C] text-base font-medium"
                                        }>
                                        {value.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full outline-none flex items-center gap-x-4">
                            <LogoutIcon /> <span className="text-[#4C535F] text-lg font-normal">Log out</span>
                        </button>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
