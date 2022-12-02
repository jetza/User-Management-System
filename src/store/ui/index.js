import {createSlice} from "@reduxjs/toolkit";

const initialShowNotification = {
    isVisible: false,
    type: "",
    message: "",
    hasError: false,
};

const initialUIState = {
    showNotification: initialShowNotification,
    isLoading: false
};

const uiSlice = createSlice({
    name: "ui",
    initialState: initialUIState,
    reducers: {
        showNotification(state, action) {
            state.showNotification = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }});
export const uiActions = uiSlice.actions;
export default uiSlice;