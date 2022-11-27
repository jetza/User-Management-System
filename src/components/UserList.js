import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteModal from "./DeleteModal";
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {
    assignText,
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
import {usersDataActions} from "../store/usersData";

const UserList = () => {

    const state = useSelector(state => state.usersData);
    const [id, setId] = useState(null);
    // TODO: FIX RENDER PAGE ISSUE USING USECALLBACK INSTEAD OF document.location.reload();

    const textsUserListSort = [
        firstNameText,
        lastNameText,
        userNameText,
        emailText,
    ];
    const textsUserList = [
        passwordText,
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
    }, [dispatch, id]);

    function assignPermissionNavigate(userId) {
        navigate(`../assign-permissions?id=` + userId);
    }

    const orderAscending = (e, asc) => {
        let sortedAsc = [];
        switch(asc) {
            case (1):
                sortedAsc = state.usersData.slice(0).sort((a,b) => a?.firstName > a.firstName? 1: (a.firstName < b.firstName? -1: 0));
                break;
            case (2):
                sortedAsc = state.usersData.slice(0).sort((a,b) => a?.lastName > a.lastName? 1: (a.lastName < b.lastName? -1: 0));
                break;
            case (3):
                sortedAsc = state.usersData.slice(0).sort((a,b) => a?.userName > a.userName? 1: (a.userName < b.userName? -1: 0));
                break;
            case (4):
                sortedAsc = state.usersData.slice(0).sort((a,b) => a?.email > a.email? 1: (a.email < b.email? -1: 0));
                break;
            default:
                sortedAsc = state.usersData
        }
        return dispatch(usersDataActions.setUsersData(sortedAsc));
    }


    function orderDescending(e, desc) {
        let sortedDesc = [];
        switch(desc) {
            case (1):
                sortedDesc = state.usersData.slice(0).sort((a,b) => a?.firstName < a.firstName? 1: (a.firstName > b.firstName? -1: 0));
                break;
            case (2):
                sortedDesc = state.usersData.slice(0).sort((a,b) => a?.lastName < a.lastName? 1: (a.lastName > b.lastName? -1: 0));
                break;
            case (3):
                sortedDesc = state.usersData.slice(0).sort((a,b) => a?.userName < a.userName? 1: (a.userName > b.userName? -1: 0));
                break;
            case (4):
                sortedDesc = state.usersData.slice(0).sort((a,b) => a?.email < a.email? 1: (a.email > b.email? -1: 0));
                break;
            default:
                sortedDesc = state.usersData
        }console.log(sortedDesc)
        return dispatch(usersDataActions.setUsersData(sortedDesc));

    }

    //TODO FILTER, ORDER, PAGINATION, SPINNER
    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-md">
                <div>
                    <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">{usersText}</h2>
                    <div>
                        <div>
                            <div className="flex grid grid-cols-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                {textsUserListSort && textsUserListSort.map((text, value) => {
                                    return <div className="grid-cols-2 flex gap-4 justify-between pr-5"
                                                id={(value+1).toString()} >
                                        <span className="pt-3">{text}</span>
                                        <div className="flex-col flex justify-between">
                                            <button id="asc" onClick={(e) => orderAscending(e, value+1)}>▲</button>
                                            <button id="desc" onClick={(e) => orderDescending(e, value+1)}>▼</button>
                                        </div>
                                    </div>
                                })}
                                {textsUserList && textsUserList.map((text) => {
                                    return <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                    <span className="pt-3">{text}</span>
                                </div>})}
                            </div>
                            {state.usersData && state.usersData.map((user) => {
                                return <div
                                    className="flex grid grid-cols-9 text-sm text-indigo-700 text-ll font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                    <div>
                                        {user?.firstName}
                                    </div>
                                    <div>
                                        {user?.lastName}
                                    </div>
                                    <div>
                                        {user?.userName}
                                    </div>
                                    <div>
                                        {user?.email}
                                    </div>
                                    <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                        <div>
                                            {(user?.password).replace(/./g, '*')}
                                        </div>
                                    </div>
                                    <div>
                                        {(user.status === true) ? "Active" : "Not Active"}
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
                                        <DeleteModal id={user?.id}/>
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