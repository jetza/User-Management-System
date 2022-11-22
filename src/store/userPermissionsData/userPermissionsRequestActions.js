import {USER_PERMISSIONS_FETCH_ERROR,
        UPDATE_USER_PERMISSIONS_ERROR
} from "../../constants/apiMessages";
import {userPermissionsDataActions} from "./index";


export const getUserPermissionsData = id => {

    return async dispatch => {
        const fetchUserPermissionsData = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}/${id}/Permissions`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`${USER_PERMISSIONS_FETCH_ERROR}`);
            }
            const userPermissionsData = await response.json();
            dispatch(userPermissionsDataActions.setUserPermissionsData(userPermissionsData));
        };
        try {
            await fetchUserPermissionsData();
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateUserPermissionsData = (updatedUserPermissions, id) => {
    return async dispatch => {
        const updateUserPermissionsRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}/${id}/Permissions`, {
                method: 'PUT',
                headers: {
                    "Access-Control-Allow-Methods": '*',
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updatedUserPermissions)
            });
            if (!response.ok || response.status !== 200) {
                throw new Error(`${UPDATE_USER_PERMISSIONS_ERROR}`);
            }
            const updatedUsePermissionsData = await response.json();
            dispatch(userPermissionsDataActions.updateUserPermissionsData(updatedUsePermissionsData));
        };
        try {
            await updateUserPermissionsRequest();
        } catch (e) {
            console.log(e);
        }
    };
};

