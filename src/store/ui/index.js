import {createSlice} from "@reduxjs/toolkit";

const initialUiState = {
    isLoading: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialUiState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;