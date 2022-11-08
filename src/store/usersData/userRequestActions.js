import {API_BASE_URL} from "../../constants/apiUrls";
import {USERS_FETCH_ERROR} from "../../constants/messages";
import {usersDataActions} from "./index";

export const getAllUsers = () => {
    return async (dispatch) => {
        const fetchUserData = async () => {
            const response = await fetch(`${API_BASE_URL}Users`, {
                // credentials: "include",
                //mode: "no-cors",
                method: 'GET',
                 //headers: {
                //     'Content-type' : 'application/json',
                  //   'Access-Control-Allow-Origin': '*',
                //     'Access-Control-Allow-Credentials': '*',
                //     'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
                 //    'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization'
                //
                // }
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`${USERS_FETCH_ERROR}`);
            };
            const usersData = await response.json();
            console.log(usersData)
            const newUsersData = usersData.map((data) => {
                return {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.userName,
                    password: data.password,
                    email: data.email,
                    status: data.status,
                    permissions: data.permissions
                };
            })
            console.log(usersData);
            dispatch(usersDataActions.setUsersData(newUsersData));
            return usersData;
        };
        try {
            await fetchUserData();
        } catch (e) {
            console.log(e);
        };
    };
};
