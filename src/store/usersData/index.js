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
        },
        deleteUser(state, action) {
            const userId = action.payload;
            state.usersData = state.usersData.filter((user) =>
            user.id !== userId)
            //vraca novi niz svih elemenata koji nisu jednaki elementu sa
            // tim id
        },
        updateUser(state, action) {
            state.usersData = action.payload;
        }
    }
});

export const usersDataActions = usersDataSlice.actions;
export default usersDataSlice;