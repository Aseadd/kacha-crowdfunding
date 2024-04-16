import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "src/model/category";

interface ICategoryState {
    data: ICategory[];
    historyData: ICategory[];
}
const initialState: ICategoryState = { data: [], historyData: [] };
export const stateName = "categories";

export const CategorySlice = createSlice({
    initialState,
    name: stateName,
    reducers: {
        setCategory: (state, { payload }: { payload: ICategory[] }) => {
            const data = payload.map((value) => ({ ...value, checked: false, count: 0 }));
            state.data = data;
            state.historyData = data;
        },
        updateCategory: (state, { payload }: { payload: ICategory }) => {
            state.data = state.data.map((value) => (value._id === payload._id ? payload : value));
        },
        clearAllCategories: (state) => {
            state.data = state.data.map((value) => ({ ...value, checked: false }));
        },
    },
});

export const selectCheckedCategories = (state: { [stateName]: ICategoryState }): ICategory[] =>
    state[stateName].data.filter((value) => value.checked);
export const selectCategories = (state: { [stateName]: ICategoryState }): ICategory[] => state[stateName].data;

export const { setCategory, updateCategory, clearAllCategories } = CategorySlice.actions;
