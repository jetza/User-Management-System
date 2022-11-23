import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pinkButtonClasses} from "../constants/cssClasses";
import {getPermissionsData} from "../store/permissionsData/permissionRequestActions.js";
import {ArrowLeft} from "../constants/svgIcons"
import {getUserPermissionsData,
        updateUserPermissionsData
} from "../store/userPermissionsData/userPermissionsRequestActions.js";
import {actionsText,
        codeText, descriptionText,
        permissionsForUserText,
        removePermissionText,
} from "../constants/texts";
import ViewPermissionsModal from "./ViewPermissionsModal";

const AssignPermission = () => {

    const state = useSelector( state => state.usersData);
    const permissions = useSelector(permission => permission.permissionsData);
    const userPermissions = useSelector(userPermission => userPermission.userPermissionsData);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);

    const userPermissionsLength = userPermissions.userPermissionsData.length;
    let userPermissionsAssignedObject = []; //sadrzi sve permisije za tog usera

    for(let i = 0; i < userPermissionsLength; i++){
        userPermissionsAssignedObject[i] =
            permissions.permissionsData.find(r => r.id === userPermissions.userPermissionsData[i]);
    }

    const userPermissionsNotAssignedObject = //sadrzi sve permisije koje nema taj user
        permissions.permissionsData.filter(x => !userPermissionsAssignedObject.includes(x));

    useEffect(() => {
        dispatch(getPermissionsData());
        dispatch(getUserPermissionsData(userParamId));
    }, [dispatch]);

    function homeNavigate() {
        navigate("../");
    }

    function deletePermission(permissionId) {
        const removedPermissionId = userPermissionsAssignedObject.findIndex((obj) => obj.id === permissionId);
        userPermissionsAssignedObject.splice(removedPermissionId, 1);
        const permissionsArray = userPermissionsAssignedObject.map(a => a.id);
        const result = {
            "permissionIds": permissionsArray
        };
        console.log(result)
        dispatch(updateUserPermissionsData(result, userParamId));
    }

    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-md">
                <div>
                    <div className="grid-cols-2 flex justify-between mb-5 text-3xl ml-4 font-bold text-indigo-700">
                        <div className="grid-cols-2 flex justify-between mb-5">
                            <button onClick={homeNavigate}>
                                <ArrowLeft/>
                            </button>
                            <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">
                                {permissionsForUserText} {userIdObject.userName}</h2>
                        </div>
                        <div>
                            <ViewPermissionsModal permissionProps={userPermissionsNotAssignedObject}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="flex grid grid-cols-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                                <div>
                                    <span>{codeText}</span>
                                </div>
                                <div>
                                    <span>{descriptionText}</span>
                                </div>
                                <div>
                                    <span>{actionsText}</span>
                                </div>
                            </div>
                            {userPermissionsAssignedObject && userPermissionsAssignedObject.map((permission) => {
                                return <div className="flex grid grid-cols-3 text-sm text-indigo-700 text-xl font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                    <div >
                                        {permission.code}
                                    </div>
                                    <div >
                                        {permission.description}
                                    </div>
                                    <div>
                                        <button
                                            className={pinkButtonClasses}
                                            type="button"
                                            onClick={() => deletePermission(permission.id)}
                                        >
                                            {removePermissionText}
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