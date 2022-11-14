import {createSlice} from "@reduxjs/toolkit";

const initialUsersState = {
    usersData: []
};

const usersDataSlice = createSlice({
    name: "usersData",
    initialState: initialUsersState,
    reducers: {
        setUsersData(state, action) {
            state.usersData = action.payload;
        }
    }
});

export const usersDataActions = usersDataSlice.actions;
export default usersDataSlice;