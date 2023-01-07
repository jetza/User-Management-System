import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {arrowButtonClasses, pinkButtonClasses} from "../constants/cssClasses";
import {getPermissionsData} from "../store/permissionsData/permissionRequestActions.js";
import {ArrowLeft} from "../constants/svgIcons";
import AddPermissionsModal from "./AddPermissionsModal";
import {
    getUserPermissionsData,
    updateUserPermissionsData
} from "../store/userPermissionsData/userPermissionsRequestActions.js";
import {
    actionsText,
    codeText, descriptionText,
    permissionsForUserText,
    removePermissionText,
} from "../constants/texts";

const AssignPermission = () => {

    const state = useSelector(state => state?.usersData);
    const permissions = useSelector(permission => permission?.permissionsData);
    const userPermissions = useSelector(userPermission => userPermission?.userPermissionsData);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);
    const userPermissionsLength = userPermissions.userPermissionsData.length;
    let userPermissionsAssignedObject = [];

    for (let i = 0; i < userPermissionsLength; i++) {
        userPermissionsAssignedObject[i] =
            permissions.permissionsData.find(r => r.id === userPermissions.userPermissionsData[i]);
    }
    let userPermissionsNotAssignedObject =
        permissions.permissionsData.filter(x => !userPermissionsAssignedObject.includes(x));

    const homeNavigate = () => {
        navigate("../");
    }

    useEffect(() => {
        dispatch(getPermissionsData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserPermissionsData(userParamId));
    }, [dispatch, userParamId]);

    const deletePermission = (permissionId) => {
        //prima id permisije koja treba da se obrise
        //trazi index iz niza objekata gde se id objekta i id permisije poklapaju
        const permissionIdIndex = userPermissionsAssignedObject.findIndex((obj) => obj.id === permissionId);
        //dodavanje obrisane permisije u userPermissionsNotAssignedObject koji ce se poslati u AddPermissionsModal
        userPermissionsNotAssignedObject.push(userPermissionsAssignedObject[permissionIdIndex]);
        //brise objekat na toj poziciji iz niza
        userPermissionsAssignedObject.splice(permissionIdIndex, 1);
        //pomocna varijabla gde se dodaju svi id-jevi u niz koji su ostali
        const permissionsArray = userPermissionsAssignedObject.map(a => a.id);
        //konstrukcija novog objekta za body koji prima api - dodaje niz updateovanih permisija za tog usera
        const result = {
            "permissionIds": permissionsArray
        };
        dispatch(updateUserPermissionsData(result, userParamId));
        dispatch(getUserPermissionsData(userParamId));
    }

    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-4 rounded-md">
                <div>
                    <div className="grid-cols-2 flex justify-between mb-4 text-3xl  pt-4 font-bold text-indigo-700">
                        <div className="grid-cols-2 flex justify-between">
                            <button className={arrowButtonClasses}
                                onClick={homeNavigate}>
                                <ArrowLeft/>
                            </button>
                            <h2 className="mb-5 text-3xl ml-4 font-bold text-indigo-700">
                                {permissionsForUserText} {userIdObject?.userName}</h2>
                        </div>
                        <div>
                            <AddPermissionsModal permissionsAssigned={userPermissionsAssignedObject}
                                                  permissionsNotAssigned={userPermissionsNotAssignedObject}
                                                  userId={userParamId}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div
                                className="flex grid grid-cols-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-5 px-4 text-white font-bold text-md">
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
                                return <div
                                    className="flex grid grid-cols-3 text-sm text-indigo-700 text-xl font-bold  mt-4 py-2 border-t-2 px-4 border-gray-100">
                                    <div>
                                        {permission?.code}
                                    </div>
                                    <div>
                                        {permission?.description}
                                    </div>
                                    <div>
                                        <button
                                            className={pinkButtonClasses}
                                            type="button"
                                            onClick={() => deletePermission(permission?.id)}
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