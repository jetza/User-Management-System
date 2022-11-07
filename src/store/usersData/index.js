import {createSlice} from "@reduxjs/toolkit";

const initialUsersState = {
    users: []
};

const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {
        setUsersData(state, action) {
            state.users = action.payload;
        }
    }
});

export const usersDataActions = usersSlice.actions;
export default usersSlice;