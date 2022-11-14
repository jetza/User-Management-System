import {createSlice} from "@reduxjs/toolkit";

const initialUsersState = {
    id: 1,
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    status: false,
    permissions: []
    //usersData: []
};

const usersDataSlice = createSlice({
    name: "usersData",
    initialState: initialUsersState,
    reducers: {
        setUserName(state, action){
            state.userName = action.payload;
        },
        setUserData(state, action) {
            state.firstName = action.payload;
            state.lastName = action.lastName;
            state.password = action.password;
            state.email = action.email;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setPermissions(state, action){
            state.permissions = action.payload;
        },
        // setUsersData(state, action) {
        //     state.usersData = action.payload;
        // }
    }
});

export const usersDataActions = usersDataSlice.actions;
export default usersDataSlice;