export interface ISignInInput {
  email: string;
  password: string;
  remember?: boolean | null | undefined;
}

export interface IBotSignInInput {
  password: string;
}

export interface ILoginResponse {
  status: number;
  access_token: string;
  refresh_token: string;
  token_type: string;
  message: string;
}

export type IRefreshTokenResponse = ILoginResponse[];
export interface ISignUpInput {
  fullName: string;
  email: string;
  phone: string;
  address?: string | null | undefined;
  password: string;
  password_confirmation: string;
  accept_term?: true | undefined;
  accept_policy?: true | undefined;
}

export interface IRegisterResponse {
  status_code: number;
  status: string;
  message: string;
  data: {
    resend_token: string;
  };
}

export interface IActivateUserResponse {
  status_code: number;
  status: string;
  message: string;
}

export interface IResendActivateEmailResponse {
  status_code: number;
  status: string;
  message: string;
  data: {
    resend_token: string;
  };
}

export interface IResendResponse {
  status_code: number;
  status: string;
  message: string;
}

export interface IBotSignUpInput {
  fullName: string;
  email: string;
  address?: string | null | undefined;
  password: string;
  password_confirmation: string;
  accept_term?: true | undefined;
  accept_policy?: true | undefined;
}
export interface IBotSignUpInputData {
  firstname: string;
  lastname: string;
  middlename: string;
  phone: string;
  email: string;
  address?: string | null | undefined;
  password: string;
  password_confirmation: string;
  accept_term?: true | undefined;
  accept_policy?: true | undefined;
}

export interface IRegisterInput {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  address?: string | null | undefined;
  password: string;
  password_confirmation: string;
  channel: "WEB";
}

export interface IUserUpdateInput {
  fullName: string;
  email: string;
  phone: string;
  address?: string | null | undefined;
}

export interface IUpdateInput {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  address?: string | null | undefined;
  channel: "WEB";
}
export interface IUser {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  phone: string;
  email: string;
  address?: string;
  profile?: string;
}

export interface IUserResponse {
  status_code: number;
  status: string;
  message: string;
  data: IUser;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IForgotPasswordResponse {
  status_code: number;
  status: string;
  message: string;
  data: {
    resend_token: string;
  };
}

export interface IChangePasswordInput {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}

export interface IChangePasswordResponse {
  status_code: number;
  status: string;
  message: string;
}

export interface IResetPassword {
  new_password: string;
  password_confirmation: string;
}

export interface IResetPasswordInput extends IResetPassword {
  token: string;
}

export interface IResetPasswordResponse {
  status_code: number;
  status: string;
  message: string;
}
