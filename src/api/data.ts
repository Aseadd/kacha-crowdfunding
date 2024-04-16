import {
  IBotSignUpInputData,
  IChangePasswordInput,
  IRegisterInput,
  IResetPasswordInput,
  IUpdateInput,
} from "src/model/auth";
import { ICategoryFilterInput, IFavoriteFilterInput } from "src/model/campaign";
import { ICommentInput } from "src/model/comment";
import {
  IDonateInput,
  IDonateQuery,
  IJengaWebhookInput,
  IMasterCardWebhookInput,
} from "src/model/donate";
import { BotAPI, apiSlice } from "src/store/states/api";
import Helper from "src/utilities/helper";

export const dataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentTime: builder.mutation({
      query: () => ({
        url: "http://worldtimeapi.org/api/timezone/Etc/UTC",
        method: "GET",
      }),
    }),
    categories: builder.mutation({
      query: () => ({ url: "categories/", method: "GET" }),
    }),
    tags: builder.mutation({
      query: () => ({ url: "tags/", method: "GET" }),
    }),
    campaigns: builder.mutation({
      query: ({
        limit,
        page,
        category_ids,
        tag_ids,
        query,
      }: ICategoryFilterInput) => {
        const tagsId = tag_ids.join(",");
        const categoriesId = category_ids.join(",");
        let url = `campaigns/campaign?page=${page}&limit=${limit}`;
        if (tagsId.length > 0) url += `&tags=${tagsId}`;
        if (categoriesId.length > 0) url += `&category_ids=${categoriesId}`;
        if ((query?.length ?? 0) > 0) url += `&title=${query}`;
        return { url, method: "GET" };
      },
    }),
    campaignById: builder.mutation({
      query: (id: string) => {
        const token = Helper.getToken();
        if (token)
          return {
            url: `campaigns/campaign/auth/${id}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          };
        return {
          url: `campaigns/campaign/${id}`,
          method: "GET",
        };
      },
    }),
    donate: builder.mutation({
      query: (data: IDonateInput) => ({
        url: `donations/pay`,
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    campaignComment: builder.mutation({
      query: (id: string) => ({
        url: `comments/campaign/${id}?page=0&limit=100`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: (data: ICommentInput) => ({
        url: `comments/`,
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    favouriteCampaigns: builder.mutation({
      query: ({
        page,
        limit,
        order,
        orderBy,
        search,
      }: IFavoriteFilterInput) => {
        let url = `campaigns/favourites?page=${page}&limit=${limit}&order=${order}&order_by=${orderBy}`;
        if (search && search.trim().length > 0) url += `&title=${search}`;
        return {
          url: url,
          method: "GET",
          headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
        };
      },
    }),
    addFavourite: builder.mutation({
      query: (id: string) => ({
        url: `campaigns/add_favourites?campaign_id=${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    removeFavourite: builder.mutation({
      query: (id: string) => ({
        url: `campaigns/favourites/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    histories: builder.mutation({
      query: ({
        limit,
        page,
        categoriesId,
        fromDate,
        maxAmount,
        minAmount,
        toDate,
      }: IDonateQuery) => {
        let url = `donations/?page=${page}&limit=${limit}`;
        if (categoriesId) url += `&category_ids=${categoriesId.join(",")}`;
        if (fromDate) url += `&from_date=${fromDate.toISOString()}`;
        if (toDate) url += `&to_date=${toDate.toISOString()}`;
        if (minAmount) url += `&min_amount=${minAmount}`;
        if (maxAmount) url += `&max_amount=${maxAmount}`;

        return {
          url,
          method: "GET",
          headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
        };
      },
    }),
    login: builder.mutation({
      query: (data: FormData) => ({ url: "auth", body: data, method: "POST" }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    register: builder.mutation({
      query: (data: IRegisterInput) => {
        return {
          url: `register?domain=CRD&firstname=${data.firstname}&middlename=${data.middlename}&lastname=${data.lastname}&phone=${data.phone}&email=${data.email}&address=${data.address}&password=${data.password}&password_confirmation=${data.password_confirmation}&channel=${data.channel}`,
          method: "POST",
        };
      },
    }),
    reSendResetPasswordEmail: builder.mutation({
      query: (token: string) => {
        return {
          url: `resend?resend_token=${token}&type=RESET&domain=CRD`,
          method: "GET",
        };
      },
    }),
    reSendActivationEmail: builder.mutation({
      query: (token: string) => {
        return {
          url: `resend?resend_token=${token}&type=ACTIVATE&domain=CRD`,
          method: "GET",
        };
      },
    }),
    resetPasswordPost: builder.mutation({
      query: ({
        new_password,
        password_confirmation,
        token,
      }: IResetPasswordInput) => ({
        url: `users/reset_password/${token}?new_password=${new_password}&password_confirmation=${password_confirmation}`,
        method: "POST",
      }),
    }),
    activate: builder.mutation({
      query: (token: string) => {
        return {
          url: `activate?token=${token}`,
          method: "GET",
        };
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: `token/refresh?refresh_token=${refreshToken}`,
        method: "POST",
      }),
    }),
    getUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    updateProfile: builder.mutation({
      query: (data: IUpdateInput) => {
        const form = new FormData();
        form.append("profile_image", "");
        return {
          url: `users/${Helper.userId()}?firstname=${
            data.firstname
          }&middlename=${data.middlename}&lastname=${data.lastname}&address=${
            data.address
          }`,
          body: form,
          method: "PATCH",
          headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
        };
      },
    }),
    updateProfileImage: builder.mutation({
      query: (image: Blob) => {
        const formData = new FormData();
        formData.append("profile_image", image, "profile.jpeg");

        return {
          url: `users/{id}/profile`,
          body: formData,
          method: "PATCH",
          headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
        };
      },
    }),
    removeProfileImage: builder.mutation({
      query: () => {
        const formData = new FormData();
        formData.append("profile_image", "");

        return {
          url: `users/${Helper.userId()}`,
          body: formData,
          method: "PATCH",
          headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (email: string) => ({
        url: `users/reset_password?email=${email}&domain=CRD`,
        method: "PUT",
      }),
    }),
    changePassword: builder.mutation({
      query: (data: IChangePasswordInput) => ({
        url: `users/change_password`,
        method: "PATCH",
        body: data,
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    masterCardWebhook: builder.mutation({
      query: (data: IMasterCardWebhookInput) => ({
        url: `webhooks/mastercard`,
        method: "POST",
        body: data,
      }),
    }),
    jengaWebhook: builder.mutation({
      query: (data: IJengaWebhookInput) => ({
        url: `webhooks/jenga`,
        method: "POST",
        body: data,
      }),
    }),
    likeComment: builder.mutation({
      query: (id: string) => ({
        url: `comments/like/${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${Helper.getToken() ?? ""}` },
      }),
    }),
    currencies: builder.mutation({
      query: () => ({
        url: `currencies/currency?page=0&limit=100`,
        method: "GET",
      }),
    }),
  }),
});

export const botLogin = async (data: { phone: string; password: string }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch(`${BotAPI}auth/login`, requestOptions);
    if (response.status < 300) return await response.json();
    return Promise.reject(await response.json());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const botRegister = async (data: IBotSignUpInputData) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch(`${BotAPI}auth/register`, requestOptions);
    if (response.status < 300) return await response.json();
    return Promise.reject(await response.json());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetUserMutation,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useCategoriesMutation,
  useTagsMutation,
  useCampaignsMutation,
  useFavouriteCampaignsMutation,
  useCurrentTimeMutation,
  useAddFavouriteMutation,
  useCampaignByIdMutation,
  useCampaignCommentMutation,
  useAddCommentMutation,
  useRemoveFavouriteMutation,
  useDonateMutation,
  useReSendActivationEmailMutation,
  useHistoriesMutation,
  useUpdateProfileImageMutation,
  useRemoveProfileImageMutation,
  useMasterCardWebhookMutation,
  useJengaWebhookMutation,
  useLogoutMutation,
  useLikeCommentMutation,
  useCurrenciesMutation,
  useActivateMutation,
  useResetPasswordPostMutation,
  useReSendResetPasswordEmailMutation,
} = dataApiSlice;
