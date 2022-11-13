import {createSlice} from "@reduxjs/toolkit";

const initialUsersState = {
    // id: 1,
    // firstName: "",
    // lastName: "",
    // userName: "",
    // password: "",
    // email: "",
    // status: false,
    // permissions: []
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