import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteModal from "./DeleteModal";
import {usersDataActions} from "../store/usersData";
import {
    pagingArrowsClasses,
    pagingArrowsDisabledClasses,
    pagingNumbersClasses,
    pinkButtonClasses
} from "../constants/cssClasses.js";
import {
    assignText,
    createText,
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
//TODO FILTER, SPINNER
// TODO: FIX RENDER PAGE ISSUE USING USECALLBACK INSTEAD OF document.location.reload();

const UserList = () => {

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

    //user edit, assign, sort
    const state = useSelector(state => state?.usersData);
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const editUserNavigate = (userId) => {
        setId(userId);
        navigate(`../edit-user?id=` + userId);
    }
    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch, id]);

    const assignPermissionNavigate = (userId) => {
        navigate(`../assign-permissions?id=` + userId);
    }
    const createUserNavigate = () => {
        navigate("../create-user");
    }
    //end user edit, assign, sort

    //pagination
    const [number, setNumber] = useState(1); // No of pages
    const [postPerPage] = useState(5);
    const [disableLButton, setDisableLButton] = useState(false);
    const [disableRButton, setDisableRButton] = useState(false);
    const lastPost = number * postPerPage;
    const firstPost = lastPost - postPerPage;
    const currentPost = state.usersData.slice(firstPost, lastPost);
    let pageNumber = [];

    for (let i = 1; i <= Math.ceil(state.usersData.length / postPerPage); i++) {
        pageNumber.push(i);
    }
    const ChangePage = (pageNumber) => {
        setNumber(pageNumber);
    };
    const paginateLeft = () => {
        setNumber(number - 1)
    }
    const paginateRight = () => {
        setNumber(number + 1)
    }

    useEffect(() => {
        (number+1 > pageNumber.length)? setDisableRButton(true): setDisableRButton(false);
        (number+1 < pageNumber.length)? setDisableLButton(true): setDisableLButton(false);
    }, [number, pageNumber.length]);
    //end pagination

    //ordering
    //TODO DON'T LIKE THIS!!!
    const orderAscending = (asc) => {
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

    const orderDescending = (desc) => {
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
        }
        return dispatch(usersDataActions.setUsersData(sortedDesc));
    }
    //end ordering

    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-md">
                <div>
                    <div className="flex justify-between items-center p-4 b">
                        <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">{usersText}</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                className={pinkButtonClasses}
                                type="button"
                                onClick={createUserNavigate}>
                                {createText}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="flex grid grid-cols-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                {textsUserListSort && textsUserListSort.map((text, value) => {
                                    return <div className="grid-cols-2 flex gap-4 justify-between pr-5"
                                                id={(value+1).toString()} >
                                        <span className="pt-3">{text}</span>
                                        <div className="flex-col flex justify-between">
                                            <button id="asc" onClick={(e) => orderAscending(value+1)}>▲</button>
                                            <button id="desc" onClick={(e) => orderDescending(value+1)}>▼</button>
                                        </div>
                                    </div>
                                })}
                                {textsUserList && textsUserList.map((text) => {
                                    return <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                    <span className="pt-3">{text}</span>
                                </div>})}
                            </div>
                            {currentPost && currentPost.map((user) => {
                                return <div
                                    className="flex grid grid-cols-9 text-sm text-indigo-700 text-ll font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                    <div>{user?.firstName}</div>
                                    <div>{user?.lastName}</div>
                                    <div>{user?.userName}</div>
                                    <div>{user?.email} </div>
                                    <div className="grid-cols-2 flex gap-4 justify-between pr-5">
                                        <div>{(user?.password).replace(/./g, '*')}</div>
                                    </div>
                                    <div>{(user.status === true) ? "Active" : "Not Active"}</div>
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
                    {/*pagination*/}
                    <div className="my-3 text-center">
                        <button
                            className={disableLButton?pagingArrowsDisabledClasses:pagingArrowsClasses}
                            onClick={paginateLeft}
                            disabled={disableLButton}>ᐊ
                        </button>

                        {pageNumber.map((el) => {
                            return (
                                <>
                                    <button
                                        className={pagingNumbersClasses}
                                        onClick={() => ChangePage(el)}>
                                        {el}
                                    </button>
                                </>
                            );
                        })}
                        <button
                            className={disableRButton?pagingArrowsDisabledClasses:pagingArrowsClasses}
                            onClick={paginateRight}
                            disabled={disableRButton}>ᐅ
                        </button>
                    </div>
                    {/*pagination*/}
                </div>
            </div>
        </div>
    );
};

export default UserList;