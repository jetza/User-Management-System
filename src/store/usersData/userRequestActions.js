import {API_BASE_URL} from "../../constants/apiUrls";
import {USERS_FETCH_ERROR} from "../../constants/messages";
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
            const userNames = usersData.map(({ userName }) => userName);
            dispatch(usersDataActions.setUserName(userNames));
        };
        try {
            await fetchUsersData();
        } catch (e) {
            console.log(e);
        }
    };
};
