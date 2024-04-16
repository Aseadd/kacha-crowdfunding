import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "src/store/states/api";
import { stateName as authStateName, AuthSlice } from "src/store/states/auth";
import { stateName as categoryStateName, CategorySlice } from "src/store/states/category";
import { stateName as tagStateName, TagSlice } from "src/store/states/tag";
import { stateName as campaignStateName, CampaignSlice } from "src/store/states/campaign";
import { stateName as modalStateName, ModalSlice } from "src/store/states/modal";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authStateName]: AuthSlice.reducer,
        [categoryStateName]: CategorySlice.reducer,
        [tagStateName]: TagSlice.reducer,
        [campaignStateName]: CampaignSlice.reducer,
        [modalStateName]: ModalSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
