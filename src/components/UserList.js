import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {getUsersData} from "../store/usersData/userRequestActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteModal from "./DeleteModal";

const UserList = () => {

    const state = useSelector( state => state.usersData);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch]);

    function editUserNavigate(id) {
        navigate("../edit-user");
        return id;
    }
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
                                                <span>Username</span>
                                            </div>
                                        </div>
                                        {state.usersData && state.usersData.map((user) => {
                                            return <div className="flex grid grid-cols-8 text-sm text-indigo-700 text-xl font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                                <div >
                                                    {user.userName}
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={editUserNavigate(user.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={assignPermissionNavigate}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                                <div>
                                                    <DeleteModal />
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