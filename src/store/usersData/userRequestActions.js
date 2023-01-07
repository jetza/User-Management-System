import {USERS_FETCH_ERROR, DELETE_USER_ERROR, UPDATE_USER_ERROR, CREATE_USER_ERROR} from "../../constants/apiMessages";
import {usersDataActions} from "./index";
import {uiActions} from "../ui";

export const getUsersData = () => {
    return async dispatch => {
        const fetchUsersData = async () => {
            //TODO: add offline alert with notifications
            // if(navigator.onLine === false)
            //     alert("error");
            dispatch(uiActions.setIsLoading(true));
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}Users`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`${USERS_FETCH_ERROR}`);
            }
            const usersData = await response.json();
            // const newUsersData = usersData.map((data) => {
            //     return {
            //         id: data.id,
            //         firstName: data.firstName,
            //         lastName: data.lastName,
            //         userName: data.userName,
            //         password: data.password,
            //         email: data.email,
            //         status: data.status,
            //         permissions: data.permissions
            //     };
            // })
            dispatch(usersDataActions.setUsersData(usersData));
            dispatch(uiActions.setIsLoading(false));
        };
        try {
            await fetchUsersData();
        } catch (e) {
            console.log(e);
            dispatch(uiActions.setIsLoading(false));
        }
    };
};
export const deleteUserData = id => {
    return async dispatch => {
        const deleteUserRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}User/${id}`, {
                method: 'DELETE',
                headers: {
                    "Access-Control-Allow-Methods": '*'
                }
            });
            if (!response.ok || response.status !== 200) {
                throw new Error(`${DELETE_USER_ERROR}`);
            }
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
    return async dispatch => {
        const updateUserRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}Users/${id}`, {
                method: 'PUT',
                headers: {
                    "Access-Control-Allow-Methods": '*',
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });
            if (!response.ok || response.status !== 200) {
                throw new Error(`${UPDATE_USER_ERROR}`);
            }
            const updatedUserData = await response.json();
            dispatch(usersDataActions.updateUser(updatedUserData));
        };
        try {
            await updateUserRequest();
        } catch (e) {
            console.log(e);
        }
    };
};

export const createUserData = (createdUser) => {
    return async dispatch => {
        const createUserRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_API_URL}Users`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Methods": '*',
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(createdUser)

            });
            if (!response.ok || response.status !== 200 ) {
                throw new Error(`${CREATE_USER_ERROR}`);
            }

            //TODO: creates user but throw an error
            const createdUserData = await response.json();
            console.log(createdUserData)
            dispatch(usersDataActions.createUser(createdUserData));
        };
        try {
            await createUserRequest();
        } catch (e) {
            console.log(e);
        }
    };
};
