import {USERS_FETCH_ERROR, DELETE_USER_ERROR, UPDATE_USER_ERROR} from "../../constants/apiMessages";
import {usersDataActions} from "./index";


export const getUsersData = () => {
    return async dispatch => {
        const fetchUsersData = async () => {
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
            console.log("create user response",response)
            if (!response.ok || response.status !== 200) {
                throw new Error(`${UPDATE_USER_ERROR}`);
            }
            const createdUserData = await response.json();
            dispatch(usersDataActions.createUser(createdUserData));
        };
        try {
            await createUserRequest();
        } catch (e) {
            console.log(e);
        }
    };
};
