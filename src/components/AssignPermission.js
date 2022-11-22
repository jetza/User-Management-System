import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {pinkButtonClasses} from "../constants/cssClasses";
import {getUsersData} from "../store/usersData/userRequestActions";
// import {useNavigate} from "react-router-dom";
import {getPermissionsData} from "../store/permissionsData/permissionRequestActions.js"
// import {
//     assignText,
//     editText,
//     userNameText
// } from "../constants/texts";


const AssignPermission = () => {

    const state = useSelector( state => state.usersData);
    const permissions = useSelector(state => state.permissionsData)
    const dispatch = useDispatch();
    // let navigate = useNavigate();
    //TODO SHIFT ADD PERMISSION BUTTON RIGHT TO THE PERMISSIONS HEADER, MAP PERMISSIONS
    //TODO CREATE NEW POST ENDPOINT TO API
console.log(permissions.permissionsData)
    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);


    useEffect(() => {
        dispatch(getPermissionsData());
    }, [dispatch]);

    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-md">
                <div>

                    <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">Permissions for user: {userIdObject.userName}</h2>


                    <div>
                        <button
                            className={pinkButtonClasses}
                            type="button"
                            //onClick={() => editUserNavigate(user.id)}
                        >
                            Add Permission
                        </button>
                    </div>


                    <div>
                        <div>
                            <div className="flex grid grid-cols-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                <div>
                                    <span>User Permission</span>
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
                                            //onClick={assignPermissionNavigate}
                                        >
                                            Remove Permission
                                        </button>
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

export default AssignPermission;