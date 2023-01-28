import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui";
import usersDataSlice from "./usersData";

import permissionsDataSlice from "./permissionsData";
import userPermissionsDataSlice from "./userPermissionsData";

export const store = configureStore({
    reducer: {
        usersData: usersDataSlice.reducer,
        permissionsData: permissionsDataSlice.reducer,
        userPermissionsData: userPermissionsDataSlice.reducer,
        ui: uiSlice.reducer,
    }
});
