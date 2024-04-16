import { createSlice } from "@reduxjs/toolkit";
import { ITag } from "src/model/tag";

interface ITagState {
    data: ITag[];
}
const initialState: ITagState = { data: [] };
export const stateName = "tags";

export const TagSlice = createSlice({
    initialState,
    name: stateName,
    reducers: {
        setTag: (state, { payload }: { payload: ITag[] }) => {
            state.data = payload.map((value) => ({ ...value, checked: false, count: 0 }));
        },
        updateTag: (state, { payload }: { payload: ITag }) => {
            state.data = state.data.map((value) => (value._id === payload._id ? payload : value));
        },
        clearAllTags: (state) => {
            state.data = state.data.map((value) => ({ ...value, checked: false }));
        },
    },
});

export const selectCheckedTags = (state: { [stateName]: ITagState }): ITag[] => state[stateName].data.filter((value) => value.checked);
export const selectTags = (state: { [stateName]: ITagState }): ITag[] => state[stateName].data;

export const { setTag, updateTag, clearAllTags } = TagSlice.actions;
