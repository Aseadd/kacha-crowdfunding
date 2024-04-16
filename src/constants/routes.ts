// https://www.kacha.et/?resultIndicator=7ce56598b9124dde&sessionVersion=7e8b2cf710
export const RouteName = {
  BotRoute: "bot",
  WhatsappRoute: "whatsapp",
  WhatsappSignInRoute: "sign-in/:phone",
  WhatsappSignUpRoute: "sign-up/:phone",
  BotWhatsappSignInRoute: "/bot/whatsapp/sign-in",
  BotWhatsappSignUpRoute: "/bot/whatsapp/sign-up",
  BotWhatsappSuccess: "/bot/whatsapp/success",
  Home: "",
  SucccessPage: "/auth/register/success",
  ActivateUser: "/auth/activate",
  ResetPassword: "/auth/reset-password",
  FogotPassword: "/auth/forgot-password",
  CampaignDetail: "campaigns/:id",
  Campaign: "/campaigns",
  Category: "category",
  FAQ: "faq",
  FAQDetail: "faq/:id",
  Account: "account",
  Profile: "profile",
  AccountProfile: "account/profile",
  History: "histories",
  AccountHistory: "account/histories",
  Favorite: "favorites",
  AccountFavorite: "account/favorites",
  PolicyPrivacy: "/policy-privacy",
  TermsConditions: "/terms-conditions",
  CharityDisclosure: "charity-disclosure",
  checkOut: "/check-out",
  DonationConfirmMasterCard: "/donation/confirm/master-card",
  DonationConfirmJenga: "/donation/confirm/jenga",
  DonationConfirmVisaSuccess: "/donation/confirm/visa/success",
  DonationConfirmVisaError: "/donation/confirm/visa/error",
};

export const AccountRoute = [
  { name: "User info", route: RouteName.Profile },
  { name: "Donation History", route: RouteName.History },
  { name: "Favorite", route: RouteName.Favorite },
];

export const ProtectedRoutes = [
  `/${RouteName.Account}`,
  `/${RouteName.AccountProfile}`,
  `/${RouteName.AccountFavorite}`,
  `/${RouteName.AccountHistory}`,
];
