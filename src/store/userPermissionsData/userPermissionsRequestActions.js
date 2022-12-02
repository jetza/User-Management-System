import {USER_PERMISSIONS_FETCH_ERROR,
        UPDATE_USER_PERMISSIONS_ERROR
} from "../../constants/apiMessages";
import {userPermissionsDataActions} from "./index";
import {uiActions} from "../ui";


export const getUserPermissionsData = id => {

    return async dispatch => {
        const fetchUserPermissionsData = async () => {
            dispatch(uiActions.setIsLoading(true));
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}User/${id}/Permissions`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`${USER_PERMISSIONS_FETCH_ERROR}`);
            }
            const userPermissionsData = await response.json();
            dispatch(userPermissionsDataActions.setUserPermissionsData(userPermissionsData));
            dispatch(uiActions.setIsLoading(false));
        };
        try {
            await fetchUserPermissionsData();
        } catch (e) {
            console.log(e);
            dispatch(uiActions.setIsLoading(false));
        }
    };
};

export const updateUserPermissionsData = (updatedUserPermissions, id) => {
    console.log(updatedUserPermissions)
    return async dispatch => {
        const updateUserPermissionsRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}User/${id}/Permissions`, {
                method: 'PUT',
                headers: {
                    "Access-Control-Allow-Methods": '*',
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updatedUserPermissions)
            });
            console.log(response)
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

