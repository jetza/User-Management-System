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
            user.id !== userId);
            //vraca novi niz svih elemenata koji nisu jednaki objektu tog userId
        },
        updateUser(state, action) {
            const userId = action.payload;
            const updatedUser = state.usersData.find(user => user.id === userId);
            state.usersData = state.usersData.map(user => user.id !== userId? user: updatedUser );
            //vraca novi niz sa izmenjenim objektom gde je id objekta iz usersData jednak userId
        },
        createUser(state, action) {
            state.usersData = action.payload;
        }
    }
});

export const usersDataActions = usersDataSlice.actions;
export default usersDataSlice;