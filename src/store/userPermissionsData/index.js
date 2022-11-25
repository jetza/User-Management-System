import {createSlice} from "@reduxjs/toolkit";

const initialUserPermissionsState = {
    userPermissionsData: []
};

const userPermissionsDataSlice = createSlice({
    name: "userPermissionsData",
    initialState: initialUserPermissionsState,
    reducers: {
        setUserPermissionsData(state, action) {
            state.userPermissionsData = action.payload;
        },
        updateUserPermissionsData(state, action) {
            const userPermissionsId = action.payload;

        }
    }
});

export const userPermissionsDataActions = userPermissionsDataSlice.actions;
export default userPermissionsDataSlice;