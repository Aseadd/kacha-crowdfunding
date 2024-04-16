import { Collapse } from "antd";
import { useSelector } from "react-redux";
import AccountIcon from "src/components/Icons/AccountIcon";
import DrawerArrowDownIcon from "src/components/Icons/DrawerArrowDownIcon";
import { selectAuth } from "src/store/states/auth";

interface IProps {
    handleProfileNavigation: () => void;
    handleHistoryNavigation: () => void;
    handleFavoriteNavigation: () => void;
}

export default function CollapseAccountButton({ handleFavoriteNavigation, handleHistoryNavigation, handleProfileNavigation }: IProps) {
    const auth = useSelector(selectAuth);

    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: "1",
                    label: (
                        <div className="flex p-3 items-center gap-x-3">
                            <AccountIcon />{" "}
                            <span className="text-[#0F172A] text-[20px] font-medium">
                                {auth.user?.firstname} {auth.user?.lastname}
                            </span>
                            <DrawerArrowDownIcon />
                        </div>
                    ),
                    children: (
                        <div className="w-full flex flex-col gap-y-2 pl-12">
                            <button onClick={handleProfileNavigation} className="text-start px-3 py-1 text-[#535763] text-base font-normal">
                                User info
                            </button>
                            <button onClick={handleHistoryNavigation} className="text-start px-3 py-1 text-[#535763] text-base font-normal">
                                Donation History
                            </button>
                            <button
                                onClick={handleFavoriteNavigation}
                                className="text-start px-3 py-1 text-[#535763] text-base font-normal">
                                Favorite
                            </button>
                        </div>
                    ),
                },
            ]}
            style={{ background: "#fff" }}
            className="p-0 main-menu-category-collapse"
        />
    );
}
