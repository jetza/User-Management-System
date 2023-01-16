import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUserData, getUsersData} from "../store/usersData/userRequestActions";
import {
    arrowButtonClasses,
    inputClasses, labelClasses,
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
import {ArrowLeft} from "../constants/svgIcons";

const CreateUser = () => {
//TODO VALIDATION OF ALL EMPTY FIELDS AND REGEX EMAIL
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [isButtonDisable, setIsButtonDisable] = useState(true);

    const homeNavigate = () => {
        navigate(-1);
    }

    const saveCreatedUser = () => {

        const createdUser = {
            firstName,
            lastName,
            userName,
            password,
            email,
            status: (status === "Active")
        };
        dispatch(createUserData(createdUser));
        dispatch(getUsersData());//solved bug for not rendering page
        navigate(`../`);
    }

    const statusSave = e => {
        if (e.target.value === "1")
            setStatus("Active");
        else if (e.target.value === "0")
            setStatus("Not Active");
        else
            setStatus("");
    }

    useEffect(() => {
        console.log(firstName !== "" && lastName !== "" && userName !== "" && password !== "" && email !== "" && status !== null)
        if (firstName !== "" && lastName !== "" && email !== "" && status !== null){
            setIsButtonDisable(false);
        }
    }, [firstName, lastName, userName, password, email, status]);


    return (
        <div className="p-4 bg-gray-50">
            <div className="bg-white p-1 rounded-md">
                <div className="flex items-center space-x-2 items-baseline pt-7 ml-4">
                    <button
                        className={arrowButtonClasses}
                        type="button"
                        onClick={homeNavigate}
                    >
                        <ArrowLeft/>
                    </button>
                    <h1 className="text-3xl font-bold text-indigo-700 ml-10">
                        {createUserText}
                    </h1>
                </div>
                <form className="mt-6 ml-4 w-80">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className={labelClasses}
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
                            className={labelClasses}
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
                            className={labelClasses}
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
                            className={labelClasses}
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
                            className={labelClasses}
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
                            className={labelClasses}
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
                            className={isButtonDisable ? saveDisabledFormButtonClasses : saveFormButtonClasses}
                            disabled={isButtonDisable}
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