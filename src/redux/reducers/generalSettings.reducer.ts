import { ICategories } from "@/types/backend";
import { createSlice } from "@reduxjs/toolkit";

export interface generalSettings {
    categories: ICategories[]
}

const initialState: generalSettings = {
    categories: []
}


const generalSettingsSlide = createSlice({
    name: "generalSettings",
    initialState,
    reducers: {
        doGetCategories: (state, action) => {
            state.categories = action?.payload
        }
    }
});

export const generalSettingsReducer = generalSettingsSlide.reducer
export const { doGetCategories } = generalSettingsSlide.actions;

