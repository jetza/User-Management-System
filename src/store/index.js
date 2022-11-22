import {configureStore} from "@reduxjs/toolkit";
import usersDataSlice from "./usersData";
import uiSlice from "./ui";
import permissionsDataSlice from "./permissionsData";

export const store = configureStore({
    reducer: {
        usersData: usersDataSlice.reducer,
        permissionsData: permissionsDataSlice.reducer,
        ui: uiSlice.reducer,
    }
});
