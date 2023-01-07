import React, {useLayoutEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUsersData, updateUserData} from "../store/usersData/userRequestActions.js"
import {useNavigate} from "react-router-dom";
import {
    inputClasses,
    saveDisabledFormButtonClasses,
    saveFormButtonClasses
} from "../constants/cssClasses.js";
import {
    editUserText,
    firstNameText,
    lastNameText,
    emailText,
    statusText,
    saveText
} from "../constants/texts.js";
import {ArrowLeft} from "../constants/svgIcons";

const EditUser = () => {
    //TODO VALIDATION OF ALL EMPTY FIELDS AND REGEX EMAIL
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state?.usersData, shallowEqual);

    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);

    const displayStatus = ((userIdObject?.status.toString()) === "true") ? "Active" : "Not Active";

    const [id] = useState(userParamId);
    const [firstName, setFirstName] = useState(userIdObject.firstName);
    const [lastName, setLastName] = useState(userIdObject.lastName);
    const [email, setEmail] = useState(userIdObject.email);
    const [statusName, setStatusName] = useState(displayStatus);
    const [status, setStatus] = useState(false);


    const homeNavigate = () => {
        navigate(-1);
    }

    const saveEditedUser = (id) => {
        const updatedUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                status: status
            };
        dispatch(updateUserData(updatedUser, id));
        dispatch(getUsersData());//solved bug for not rendering page
        navigate("../");
    }
    const statusEdit = (e) => {
        if (e.target.value === "1") {
            setStatus(true);
            setStatusName("Active");
        } else if (e.target.value === "0") {
            setStatus(false);
            setStatusName("Not Active");
        } else
            setStatusName("");
    }

    return (

        <div className="p-4 bg-gray-50">
            <div className="bg-white p-1 rounded-md">
                <div className="flex items-center space-x-2 items-baseline ml-4">
                    <button
                        className="text-violet-700 font-bold justify-center pb-3 mr-3"
                        type="button"
                        onClick={homeNavigate}
                    >
                        <ArrowLeft/>
                    </button>
                    <h1 className="text-3xl font-semi-bold text-indigo-700 ml-10">
                        {editUserText}
                    </h1>
                </div>
                <form className="mt-6 ml-4 w-80">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            {firstNameText}
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            {lastNameText}
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            {emailText}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            {statusText} {statusName === "" ? (<span className="text-red-500">[Enter 1 or 0]</span>) :
                            <span></span>}
                        </label>
                        <input
                            type="text"
                            value={statusName}
                            onChange={statusEdit}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className={statusName === "" ? saveDisabledFormButtonClasses : saveFormButtonClasses}
                            disabled={statusName === ""}
                            onClick={() => saveEditedUser(id)}>
                            {saveText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;