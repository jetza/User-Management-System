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
            console.log("userPermissionsId", userPermissionsId)
            // const updatedUserPermission = state.userPermissionsData.find(userPermissions => userPermissions.id === userPermissionsId);
            // state.userPermissionsData = state.userPermissionsData.map(userPermissions => userPermissions.id !== userPermissionsId? userPermissions: updatedUserPermissions );
            //vraca novi niz sa izmenjenim objektom gde je id objekta iz usersData jednak userId
        }
    }
});

export const userPermissionsDataActions = userPermissionsDataSlice.actions;
export default userPermissionsDataSlice;