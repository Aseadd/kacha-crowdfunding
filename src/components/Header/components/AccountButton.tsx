import { Dropdown } from "antd";
import DropdownItem from "src/components/DropdownItem";
import { RouteName } from "src/constants/routes";
import accountIcon from "src/assets/svg/account.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignOutIcon from "src/components/Icons/SignOutIcon";
import { useNotificationContext } from "src/context/NotificationContext";
import { resetAuth, selectAuth } from "src/store/states/auth";
import Helper from "src/utilities/helper";
import { imageUrl } from "src/utilities/image";
import { useLogoutMutation } from "src/api/data";

export default function AccountButton() {
    const dispatch = useDispatch();
    const user = useSelector(selectAuth).user;
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
        <Dropdown
            overlayClassName="bg-[#FCFCFC] rounded-2xl"
            trigger={["click"]}
            overlayStyle={{ boxShadow: "0px 0px 8px 0px rgba(34, 34, 34, 0.10)" }}
            menu={{
                items: [
                    { key: "1", label: <DropdownItem to={RouteName.AccountProfile} text="Your info" /> },
                    { key: "2", label: <DropdownItem to={RouteName.AccountHistory} text="Donation History" /> },
                    { key: "3", label: <DropdownItem to={RouteName.AccountFavorite} text="Favorite" /> },
                    { type: "divider" },
                    {
                        key: "4",
                        label: (
                            <span className="outline-none text-[#1A1A1A] text-lg font-medium p-3 flex items-center gap-x-1 w-full">
                                <SignOutIcon />
                                <span>Sign out</span>
                            </span>
                        ),
                        onClick: handleLogout,
                    },
                ],
            }}
            placement="bottomRight">
            <button className="w-8 h-8 outline-none">
                <img src={imageUrl(user?.profile) ?? accountIcon} alt="" className="w-full h-full rounded-full" />
            </button>
        </Dropdown>
    );
}
