import {PERMISSIONS_FETCH_ERROR} from "../../constants/apiMessages";
import {permissionsDataActions} from "./index";
import {uiActions} from "../ui";

export const getPermissionsData = () => {

    return async dispatch => {
        const fetchPermissionsData = async () => {
            dispatch(uiActions.setIsLoading(true));
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}Permissions`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`${PERMISSIONS_FETCH_ERROR}`);
            }
            const permissionsData = await response.json();
            const newPermissionsData = permissionsData.map((data) =>{
                return {
                    id: data.id,
                    code: data.code,
                    description: data.description,
                }
            })
             dispatch(permissionsDataActions.setPermissionsData(newPermissionsData));
            dispatch(uiActions.setIsLoading(false));
        };
        try {
            await fetchPermissionsData();
        } catch (e) {
            console.log(e);
            dispatch(uiActions.setIsLoading(false));
        }
    };
};