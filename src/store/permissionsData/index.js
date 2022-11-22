import {createSlice} from "@reduxjs/toolkit";

const initialPermissionsState = {
    permissionsData: []
};

const permissionsDataSlice = createSlice({
    name: "permissionsData",
    initialState: initialPermissionsState,
    reducers: {
        setPermissionsData(state, action) {
            state.permissionsData = action.payload;
        },
    }
});

export const permissionsDataActions = permissionsDataSlice.actions;
export default permissionsDataSlice;