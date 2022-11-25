import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import {getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
//import Spinner from "./Spinner";
import DeleteModal from "./DeleteModal";
import {ArrowSort} from "../constants/svgIcons.js"
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {assignText,
        deleteText,
        editText,
        emailText,
        firstNameText,
        lastNameText,
        passwordText,
        statusText,
        userNameText,
        usersText,
} from "../constants/texts.js";

const UserList = () => {

    const state = useSelector( state => state.usersData);
    const [id, setId] = useState(null);
    // useCallback(
    //     () => {
    //         useSelector( state => state.usersData)
    //     },
    //     [input],
    // );



    const textsUserList = [
        firstNameText,
        lastNameText,
        userNameText,
        passwordText,
        emailText,
        statusText,
        editText,
        assignText,
        deleteText
    ];
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const editUserNavigate = (userId) => {
        setId(userId);
        navigate(`../edit-user?id=` + userId);
    }

    useEffect(() => {
        dispatch(getUsersData());
    },[dispatch, id] ); //removed dependency array for rendering page after changing state

    function assignPermissionNavigate(userId) {
        navigate(`../assign-permissions?id=` + userId);
    }

    //TODO FILTER, ORDER, PAGINATION, SPINNER
    return (
                    <div className="p-4 bg-gray-50">
                        <div className="bg-white p-4 rounded-md">
                            <div>
                                <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">{usersText}</h2>
                                <button >
                                    <ArrowSort/>
                                </button>
                                <div>
                                    <div>
                                        <div className="flex grid grid-cols-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                            {textsUserList && textsUserList.map((text) => {
                                                return <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                                    <span>{text}</span>
                                                </div>
                                                })}
                                        </div>
                                        {state.usersData && state.usersData.map((user) => {
                                            return <div className="flex grid grid-cols-9 text-sm text-indigo-700 text-ll font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                                <div>
                                                    {user?.firstName}
                                                </div>
                                                <div>
                                                    {user?.lastName}
                                                </div>
                                                <div>
                                                    {user?.userName}
                                                </div>
                                                <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                                   <div>
                                                       {(user?.password).replace(/./g, '*')}
                                                   </div>
                                                </div>
                                                <div>
                                                    {user?.email}
                                                </div>
                                                <div>
                                                    {(user.status === true)? "Active": "Not Active"}
                                                </div>
                                                <div>
                                                    <button
                                                        className={pinkButtonClasses}
                                                        type="button"
                                                        onClick={() => editUserNavigate(user?.id)}
                                                    >
                                                        {editText}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={pinkButtonClasses}
                                                        type="button"
                                                        onClick={() => assignPermissionNavigate(user?.id)}
                                                    >
                                                        {assignText}
                                                    </button>
                                                </div>
                                                <div>
                                                    <DeleteModal id={user?.id} />
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