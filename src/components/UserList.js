import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteUserData, getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
import {pinkButtonClasses} from "../constants/cssClasses.js"
import {userNameText,
        editText,
        assignText,
        deleteUserText,
        questionDeleteUserText,
        discardText,
        deleteText,
} from "../constants/texts.js";

const UserList = () => {

    const [showModal, setShowModal] = useState(false);
    const state = useSelector( state => state.usersData);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    function editUserNavigate(userId) {
        navigate(`../edit-user?id=` + userId);
    }
    function showModalW(){
    setShowModal(true)
                       }
    function deleteUser(userId) {
        setShowModal(false);
        dispatch(deleteUserData(userId));
    }

    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch]);

    function assignPermissionNavigate() {
        navigate("../assign-permissions");
    }
    return (
                    <div className="p-4 bg-gray-50">
                        <div className="bg-white p-4 rounded-md">
                            <div>
                                <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">Users</h2>
                                <div>
                                    <div>
                                        <div className="flex grid grid-cols-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                            <div>
                                                <span>{userNameText}</span>
                                            </div>
                                        </div>
                                        {state.usersData && state.usersData.map((user) => {
                                            return <div className="flex grid grid-cols-8 text-sm text-indigo-700 text-xl font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                                <div >
                                                    {user.userName}
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
                                                        onClick={assignPermissionNavigate}
                                                    >
                                                        {assignText}
                                                    </button>
                                                </div>
                                                {/*delete button*/}
                                                <div>
                                                        <button
                                                            className={pinkButtonClasses}
                                                            type="button"
                                                            onClick={() => showModalW(user.id)}
                                                        >
                                                            {deleteText}
                                                        </button>
                                                        {showModal ? (
                                                            <>
                                                                <div
                                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                                >
                                                                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                                                                        {/*content*/}
                                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                            {/*header*/}
                                                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                                <h3 className="text-3xl font-semibold">
                                                                                    {deleteUserText}
                                                                                </h3>
                                                                                <button
                                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                                    onClick={() => setShowModal(false)}
                                                                                >
                                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                                  ×
                                                                                </span>
                                                                                </button>
                                                                            </div>
                                                                            {/*body*/}
                                                                            <div className="relative p-6 flex-auto">
                                                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                                    {questionDeleteUserText}
                                                                                </p>
                                                                            </div>
                                                                            {/*footer*/}
                                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                                <button
                                                                                    className="bg-white text-indigo-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={() => setShowModal(false)}
                                                                                >
                                                                                    {discardText}
                                                                                </button>
                                                                                <button
                                                                                    className="bg-indigo-700 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                    type="button"
                                                                                    onClick={() => deleteUser(user.id)}
                                                                                >
                                                                                    {deleteText}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                            </>
                                                        ) : null}
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