import { Link, useNavigate } from "react-router-dom";
import SignInModal from "src/components/Modal/SignInModal";
import SignUpModal from "src/components/Modal/SignUpModal";
import logo from "src/assets/images/logo.png";
import homeIcon from "src/assets/svg/home.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/store/states/auth";
import { RouteName } from "src/constants/routes";
import ForgotPasswordModal from "src/components/Modal/ForgotPasswordModal";
import { Drawer, Layout } from "antd";
import CategoryButton from "./components/CategoryButton";
import LanguageButton from "./components/LanguageButton";
import AccountButton from "./components/AccountButton";
import HamburgerMenuIcon from "../Icons/HamburgerMenuIcon";
import CloseIcon from "../Icons/CloseIcon";
import DrawerHomeIcon from "../Icons/DrawerHomeIcon";
import DrawerCardIcon from "../Icons/DrawerCardIcon";
import CollapseAccountButton from "./components/CollapseAccountButton";
import CollapseCategoryButton from "./components/CollapseCategoryButton";
import { closeMainMenuDrawer, openLoginModal, openMainMenuDrawer, selectMainMenuDrawer } from "src/store/states/modal";
import RegisterConfirmationModal from "../Modal/RegisterConfirmationModal";

const { Header: MainHeader } = Layout;
export default function Header() {
    const auth = useSelector(selectAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openDrawer = useSelector(selectMainMenuDrawer);

    const handleOpenSignIn = () => dispatch(openLoginModal());
    const handleOpenDrawer = () => dispatch(openMainMenuDrawer());
    const handleCloseDrawer = () => dispatch(closeMainMenuDrawer());
    const handleHomeNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate("/");
    };
    const handleCategoryNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate(RouteName.Category);
    };
    const handleFavoriteNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate(RouteName.AccountFavorite);
    };
    const handleProfileNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate(RouteName.AccountProfile);
    };
    const handleHistoryNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate(RouteName.AccountHistory);
    };
    const handleFaqNavigation = () => {
        dispatch(closeMainMenuDrawer());
        navigate(RouteName.FAQ);
    };

    return (
        <MainHeader className="w-full py-1 bg-white sticky top-0 z-50 ps-0 pe-0">
            <div className="max-w-[1224px] mx-auto w-full px-2 xs:px-8 md:px-3">
                <div className="flex items-center w-full">
                    <div className="max-w-[131px] h-11 w-full">
                        <Link to={"/"}>
                            <img src={logo} alt="logo" width={131} height={44} className="w-full" />
                        </Link>
                    </div>
                    <div className="grow flex items-center max-md:hidden">
                        <div className="flex max-md:hidden justify-center items-center px-2 w-full gap-x-8 text-base font-normal text-[#323232]">
                            {!auth.isLoggedIn && (
                                <Link
                                    to={"/"}
                                    className="text-secondary flex items-center gap-x-[10px] font-semibold py-2 px-4 border-secondary border rounded-lg">
                                    <img src={homeIcon} alt="" width={19} height={20} className="w-5 h-5" />
                                    Back to Kacha
                                </Link>
                            )}
                            <Link className="nav" to={"/"}>
                                Home
                            </Link>
                            <CategoryButton />
                            <Link className="nav" to={"https://kacha-remittance-website.vercel.app/"} target="_blank">
                                Remittance
                            </Link>
                        </div>
                        <div className="flex items-center max-md:hidden gap-x-[18px] py-2">
                            <LanguageButton />
                            {auth.isLoggedIn && <AccountButton />}
                            {!auth.isLoggedIn && (
                                <button
                                    onClick={handleOpenSignIn}
                                    className="p-[6px] text-center rounded-lg border-2 bg-primary whitespace-nowrap border-primary text-white font-medium text-base">
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex grow items-center md:hidden justify-end">
                        <button className="outline-none" onClick={handleOpenDrawer}>
                            <HamburgerMenuIcon />
                        </button>
                        <Drawer
                            className="md:hidden"
                            destroyOnClose
                            height={"auto"}
                            open={openDrawer}
                            onClose={handleCloseDrawer}
                            closeIcon={null}
                            placement="top">
                            <div className="w-full py-6 flex flex-col gap-y-8">
                                <div className="w-full flex justify-end">
                                    <button className="outline-none" onClick={handleCloseDrawer}>
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div className="w-full flex flex-col gap-y-5">
                                    {auth.isLoggedIn && (
                                        <CollapseAccountButton
                                            handleFavoriteNavigation={handleFavoriteNavigation}
                                            handleHistoryNavigation={handleHistoryNavigation}
                                            handleProfileNavigation={handleProfileNavigation}
                                        />
                                    )}
                                    <button
                                        onClick={handleHomeNavigation}
                                        className="w-full p-3 flex items-center gap-x-[6px] outline-none">
                                        <DrawerHomeIcon />
                                        <span className="text-[#323232] text-lg font-normal">Home</span>
                                    </button>
                                    <CollapseCategoryButton handleCategoryNavigation={handleCategoryNavigation} />
                                    <button onClick={handleFaqNavigation} className="w-full p-3 flex items-center gap-x-[6px] outline-none">
                                        <DrawerCardIcon />
                                        <span className="text-[#323232] text-lg font-normal">Remittance</span>
                                    </button>
                                </div>
                                {!auth.isLoggedIn && (
                                    <button
                                        onClick={handleOpenSignIn}
                                        className="outline-none flex text-white text-[15px] font-semibold items-center justify-center w-full max-w-[288px] h-12 bg-primary rounded-lg">
                                        Sign in
                                    </button>
                                )}
                                {!auth.isLoggedIn && (
                                    <button
                                        onClick={handleHomeNavigation}
                                        className="text-secondary flex gap-x-[10px] font-semibold py-2 px-4 border-secondary border items-center justify-center w-full max-w-[288px] h-12 rounded-lg">
                                        <img src={homeIcon} alt="" width={19} height={20} className="w-5 h-5" />
                                        Back to Kacha
                                    </button>
                                )}
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>
            <SignInModal />
            <SignUpModal />
            <ForgotPasswordModal />
            <RegisterConfirmationModal />
        </MainHeader>
    );
}
