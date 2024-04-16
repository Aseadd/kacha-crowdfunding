import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://remmit.kacha.net/v1/" });

export const BotAPI = "https://kacharemittancebotapi.onrender.com/api/v1/";

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["api"],
    endpoints: (_) => ({}),
});
