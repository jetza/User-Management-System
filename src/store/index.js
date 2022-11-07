import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./usersData";

const store = configureStore({
    reducer: {
        usersData: usersSlice.reducer
    }
});

export default store;