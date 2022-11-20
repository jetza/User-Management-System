import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
//import Spinner from "./Spinner";
import DeleteModal from "./DeleteModal"
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {
    userNameText,
    firstNameText,
    lastNameText,
    emailText,
    editText,
    assignText,
    statusText,
    passwordText,
} from "../constants/texts.js";

const UserList = () => {

    const state = useSelector( state => state.usersData);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    console.log(state)

    function editUserNavigate(userId) {
        navigate(`../edit-user?id=` + userId);
    }

    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch]);

    function assignPermissionNavigate(userId) {
        navigate(`../assign-permissions?id=` + userId);
    }
    //TODO FILTER, ORDER, PAGINATION, LAZY LOADING, SPINNER
    return (
                    <div className="p-4 bg-gray-50">
                        <div className="bg-white p-4 rounded-md">
                            <div>
                                <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">Users</h2>
                                <div>
                                    <div>
                                        <div className="flex grid grid-cols-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                            <div>
                                                <span>{firstNameText}</span>
                                            </div>
                                            <div>
                                                <span>{lastNameText}</span>
                                            </div>
                                            <div>
                                                <span>{userNameText}</span>
                                            </div>
                                            <div>
                                                <span>{passwordText}</span>
                                            </div>
                                            <div>
                                                <span>{emailText}</span>
                                            </div>
                                            <div>
                                                <span>{statusText}</span>
                                            </div>
                                        </div>
                                        {state.usersData && state.usersData.map((user) => {
                                            return <div className="flex grid grid-cols-8 text-sm text-indigo-700 text-ll font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                                <div>
                                                    {user.firstName}
                                                </div>
                                                <div>
                                                    {user.lastName}
                                                </div>
                                                <div>
                                                    {user.userName}
                                                </div>
                                                <div>
                                                    {user.password}
                                                </div>
                                                <div>
                                                    {user.email}
                                                </div>
                                                <div>
                                                    {user.status}
                                                </div>
                                                <div>
                                                    <button
                                                        className={pinkButtonClasses}
                                                        type="button"
                                                        onClick={() => editUserNavigate(user.id)}
                                                    >
                                                        {editText}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={pinkButtonClasses}
                                                        type="button"
                                                        onClick={() => assignPermissionNavigate(user.id)}
                                                    >
                                                        {assignText}
                                                    </button>
                                                </div>
                                                <div>
                                                    <DeleteModal id={user.id} />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
};

export default UserList;