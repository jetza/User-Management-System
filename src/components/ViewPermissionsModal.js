import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {
    addPermissionText,
    codeText,
    descriptionText,
    okText,
    viewPermissionsText
} from "../constants/texts"
import {
    getUserPermissionsData,
    updateUserPermissionsData
} from "../store/userPermissionsData/userPermissionsRequestActions";

const ViewPermissionsModal = ({permissionsAssigned, permissionsNotAssigned, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    //TODO FIX PERMISSIONS MODAL TO LOOK NORMAL
    //TODO: check line 28
    //NOTE: assign is working but when you add permission slowly

    const permissionLength = permissionsNotAssigned.length;

    const assignPermission = (permissionId) => {
        const permissionIdIndexToBeDeleted = permissionsNotAssigned.findIndex((obj) => obj.id === permissionId);
        permissionsAssigned.push(permissionsNotAssigned[permissionIdIndexToBeDeleted]);
        permissionsNotAssigned.splice(permissionIdIndexToBeDeleted, 1);
        const permissionsArray = permissionsAssigned.map(a => a.id);
        const result = {
            "permissionIds": permissionsArray
        };

        dispatch(updateUserPermissionsData(result, userId));
        dispatch(getUserPermissionsData(userId));
        setShowModal(false);
    }

    useEffect(() => {
        if(showModal === false){
            dispatch(getUserPermissionsData(userId));
        }
    }, [dispatch, userId, showModal]);


    return (
        <>
            <button
                className={pinkButtonClasses}
                type="button"
                onClick={() => setShowModal(true)}
            >
                {addPermissionText}
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold text-indigo-700">
                                        {viewPermissionsText}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                    <span
                                        className="bg-transparent text-gray-700 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                {(permissionLength !== 0) ?
                                    (<div className="relative p-6 flex-auto">
                                        <div className="grid-cols-3 text-xl flex gap-6">
                                            <h2>{codeText}</h2>
                                            <h2>{descriptionText}</h2>
                                        </div>
                                        {permissionsNotAssigned && permissionsNotAssigned.map((data) => {
                                            return <div className="grid-cols-3 flex gap-6">
                                                <span className="my-4 text-slate-500 text-lg leading-relaxed">
                                                {data.code}
                                                </span>
                                                <span className="my-4 text-slate-500 text-lg font-bold leading-relaxed">
                                                {data.description}
                                            </span>
                                                <button
                                                    className={pinkButtonClasses}
                                                    type="button"
                                                    onClick={() => assignPermission(data.id)}
                                                >
                                                    {addPermissionText}
                                                </button>
                                            </div>
                                        })}

                                    </div>) : (<div>No additional permissions to add!</div>)}
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-indigo-700 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        {okText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default ViewPermissionsModal;