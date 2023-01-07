import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUserData, getUsersData} from "../store/usersData/userRequestActions";
import {
    inputClasses,
    saveDisabledFormButtonClasses,
    saveFormButtonClasses
} from "../constants/cssClasses.js";
import {
    createUserText,
    firstNameText,
    lastNameText,
    userNameText,
    passwordText,
    emailText,
    statusText,
    saveText
} from "../constants/texts.js";

const CreateUser = () => {
//TODO VALIDATION OF ALL EMPTY FIELDS AND REGEX EMAIL
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    function homeNavigate() {
        navigate(-1);
    }

    function saveCreatedUser() {

        const createdUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            email: email,
            status: status === "Active"
        };
        dispatch(createUserData(createdUser));
        dispatch(getUsersData());//solved bug for not rendering page
        navigate(`../`);
    }

    function statusSave(e) {
        if (e.target.value === "1")
            setStatus("Active");
        else if (e.target.value === "0")
            setStatus("Not Active");
        else
            setStatus("");
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                        </svg>
                    </button>
                    <h1 className="text-3xl font-semibold text-indigo-700 ml-10">
                        {createUserText}
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
                            {userNameText}
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            {passwordText}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            {statusText}{status === "" ? (<span className="text-red-500">[Enter 1 or 0]</span>) :
                            <span></span>}
                        </label>
                        <input
                            type="text"
                            value={status}
                            onChange={statusSave}
                            className={inputClasses}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className={status === "" ? saveDisabledFormButtonClasses : saveFormButtonClasses}
                            disabled={status === ""}
                            type="submit"
                            onClick={saveCreatedUser}>
                            {saveText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateUser;