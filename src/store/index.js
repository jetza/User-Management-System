import {configureStore} from "@reduxjs/toolkit";
import usersDataSlice from "./usersData";
import uiSlice from "./ui";

export const store = configureStore({
    reducer: {
        usersData: usersDataSlice.reducer,
        ui: uiSlice.reducer
    }
});
