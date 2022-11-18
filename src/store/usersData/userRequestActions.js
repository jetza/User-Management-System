import {API_BASE_URL} from "../../constants/apiUrls";
import {USERS_FETCH_ERROR, DELETE_USER_ERROR, UPDATE_USER_ERROR} from "../../constants/apiMessages";
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
export const deleteUserData = id => {

    return async dispatch => {
        const deleteUserRequest = async () => {
            const response = await fetch(`${API_BASE_URL}User/${id}`, {
                method: 'DELETE',
                headers: {
                    "Access-Control-Allow-Methods": '*'
                }
            });
            if (!response.ok || response.status !== 200) {
                throw new Error(`${DELETE_USER_ERROR}`);
            }
            console.log(id)
            dispatch(usersDataActions.deleteUser(id));
        };
        try {
            await deleteUserRequest();
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateUserData = (updatedUser, id) => {
    console.log(updatedUser, id)
    return async dispatch => {
        const updateUserRequest = async () => {
            const response = await fetch(`${API_BASE_URL}Users/${id}`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    "Access-Control-Allow-Methods": '*'
                },
                body: JSON.stringify(updatedUser, id)

            });
            console.log(response)
            if (!response.ok || response.status !== 200) {
                throw new Error(`${UPDATE_USER_ERROR}`);
            }
            const updatedUserData = await response.json();
            //console.log("updatedUserData",updatedUserData)
            dispatch(usersDataActions.updateUser(updatedUserData));
        };
        try {
            await updateUserRequest();
        } catch (e) {
            console.log(e);
        }
    };
};
