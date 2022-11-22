import {API_BASE_URL} from "../../constants/apiUrls";
import {PERMISSIONS_FETCH_ERROR} from "../../constants/apiMessages";
import {permissionsDataActions} from "./index";

export const getPermissionsData = () => {

    return async dispatch => {
        const fetchPermissionsData = async () => {
            const response = await fetch(`${API_BASE_URL}Permissions`, {
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
        };
        try {
            await fetchPermissionsData();
        } catch (e) {
            console.log(e);
        }
    };
};