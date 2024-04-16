import { createSlice } from "@reduxjs/toolkit";
import { ICampaign } from "src/model/campaign";

interface ICampaignMain {
    data: ICampaign[];
    total_count: number;
    page: number;
    limit: number;
}

interface ICampaignState extends ICampaignMain {
    reload: number;
}
const initialState: ICampaignState = { data: [], limit: 9, page: 1, total_count: 0, reload: 0 };
export const stateName = "campaigns";

export const CampaignSlice = createSlice({
    initialState,
    name: stateName,
    reducers: {
        setCampaign: (state, { payload }: { payload: ICampaignMain }) => {
            state.data = payload.data;
            state.limit = payload.limit;
            state.page = payload.page;
            state.total_count = payload.total_count;
        },
        nextPage: (state) => {
            if (state.limit * state.page < state.total_count) {
                state.page = state.page + 1;
                state.reload = state.reload + 1;
            }
        },
        previousPage: (state) => {
            if (state.page > 1) {
                state.page = state.page - 1;
                state.reload = state.reload + 1;
            }
        },
    },
});

export const selectCampaigns = (state: { [stateName]: ICampaignState }): ICampaignState => state[stateName];

export const { setCampaign, nextPage, previousPage } = CampaignSlice.actions;
