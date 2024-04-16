import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import DataLoader from "src/components/DataLoader";
import LoaderSuspense from "src/components/LoaderSuspense";
import { RouteName } from "src/constants/routes";
import AccountLayout from "src/layouts/AccountLayout";
import PolicyLayout from "src/layouts/PolicyLayout";
import WebLayout from "src/layouts/WebLayout";

const FavoritePage = LoaderSuspense(lazy(() => import("src/pages/Account/Favorite")));
const HistoryPage = LoaderSuspense(lazy(() => import("src/pages/Account/History")));
const ProfilePage = LoaderSuspense(lazy(() => import("src/pages/Account/Profile")));
const SignInPage = LoaderSuspense(lazy(() => import("src/pages/Bot/Auth/SignIn")));
const SignUpPage = LoaderSuspense(lazy(() => import("src/pages/Bot/Auth/SignUp")));
const SuccessRegistrationPage = LoaderSuspense(lazy(() => import("src/pages/SuccessRegistration")))
const ActivateUserPage = LoaderSuspense(lazy(() => import("src/pages/ActivateUser")));
const CategoryPage = LoaderSuspense(lazy(() => import("src/pages/Category")));
const CheckoutPage = LoaderSuspense(lazy(() => import("src/pages/Checkout")));
const DonatePage = LoaderSuspense(lazy(() => import("src/pages/Donate")));
const ResetPasswordPage = LoaderSuspense(lazy(() => import("src/pages/ResetPassword")));
const ForgotPasswordPage = LoaderSuspense(lazy(() => import("src/pages/ForgotPassword")));
const DonationConfirmJengaPage = LoaderSuspense(lazy(() => import("src/pages/DonationConfirm/Jenga")));
const DonationConfirmMasterCardPage = LoaderSuspense(lazy(() => import("src/pages/DonationConfirm/MasterCard")));
const DonationConfirmVisaSuccessPage = LoaderSuspense(lazy(() => import("src/pages/DonationConfirm/CheckoutConfirmVisaSuccess")));
const DonationConfirmVisaErrorPage = LoaderSuspense(lazy(() => import("src/pages/DonationConfirm/CheckoutConfirmVisaError")));
const FAQPage = LoaderSuspense(lazy(() => import("src/pages/FAQ")));
const FAQDetailPage = LoaderSuspense(lazy(() => import("src/pages/FAQDetail")));
const HomePage = LoaderSuspense(lazy(() => import("src/pages/Home")));
const CharityDisclosurePage = LoaderSuspense(lazy(() => import("src/pages/Policy/CharityDisclosure")));
const PolicyPrivacyPage = LoaderSuspense(lazy(() => import("src/pages/Policy/PolicyPrivacy")));
const TermsConditionsPage = LoaderSuspense(lazy(() => import("src/pages/Policy/TermsConditions")));
const BotStatus200Page = LoaderSuspense(lazy(() => import("src/pages/Status/BotStatus200")));
const Status200Page = LoaderSuspense(lazy(() => import("src/pages/Status/Status200")));
const Status404Page = LoaderSuspense(lazy(() => import("src/pages/Status/Status404")));

export const router = createBrowserRouter([
    {
        path: "",
        element: <DataLoader />,
        children: [
            {
                path: "",
                element: <WebLayout />,

                children: [
                    { path: "", index: true, element: <HomePage /> },
                    { path: RouteName.CampaignDetail, element: <DonatePage /> },
                    { path: RouteName.Category, element: <CategoryPage /> },
                    { path: RouteName.FAQ, element: <FAQPage /> },
                    { path: RouteName.FAQDetail, element: <FAQDetailPage /> },
                    { path: RouteName.ActivateUser, element: <ActivateUserPage /> },
                    { path: RouteName.ResetPassword, element: <ResetPasswordPage /> },
                    { path: RouteName.FogotPassword, element: <ForgotPasswordPage /> },
                    { path: RouteName.SucccessPage, element: <SuccessRegistrationPage /> },
                    { path: RouteName.checkOut, element: <CheckoutPage /> },
                    {
                        path: RouteName.Account,
                        element: <AccountLayout />,
                        children: [
                            { path: RouteName.Profile, index: true, element: <ProfilePage /> },
                            { path: RouteName.History, element: <HistoryPage /> },
                            { path: RouteName.Favorite, element: <FavoritePage /> },
                        ],
                    },
                    { path: RouteName.DonationConfirmMasterCard, element: <DonationConfirmMasterCardPage /> },
                    { path: RouteName.DonationConfirmJenga, element: <DonationConfirmJengaPage /> },
                    { path: RouteName.DonationConfirmVisaSuccess, element: <DonationConfirmVisaSuccessPage /> },
                    { path: RouteName.DonationConfirmVisaError, element: <DonationConfirmVisaErrorPage /> },
                    {
                        path: "",
                        element: <PolicyLayout />,
                        children: [
                            { path: RouteName.PolicyPrivacy, element: <PolicyPrivacyPage /> },
                            { path: RouteName.CharityDisclosure, element: <CharityDisclosurePage /> },
                            { path: RouteName.TermsConditions, element: <TermsConditionsPage /> },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: RouteName.BotRoute,
        children: [
            {
                path: RouteName.WhatsappRoute,
                children: [
                    { path: RouteName.WhatsappSignInRoute, element: <SignInPage /> },
                    { path: RouteName.WhatsappSignUpRoute, element: <SignUpPage /> },
                    { path: RouteName.BotWhatsappSuccess, element: <BotStatus200Page /> },
                ],
            },
        ],
    },
    { path: "success", element: <Status200Page /> },
    { path: "*", element: <Status404Page /> },
]);
