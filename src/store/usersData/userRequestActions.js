import {API_BASE_URL} from "../../constants/apiUrls";
import {USERS_FETCH_ERROR} from "../../constants/apiMessages";
import {usersDataActions} from "./index";


export const getUsersData = () => {

    return async dispatch => {
        const fetchUsersData = async () => {
            const response = await fetch(`${API_BASE_URL}Users`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`${USERS_FETCH_ERROR}`);
            }
            const usersData = await response.json();
            const newUsersData = usersData.map((data) =>{
                return {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.userName,
                    password: data.password,
                    email: data.email,
                    status: data.status,
                    permissions: data.permissions
                }
            })
            dispatch(usersDataActions.setUsersData(newUsersData));

        };
        try {
            await fetchUsersData();
        } catch (e) {
            console.log(e);
        }
    };
};
