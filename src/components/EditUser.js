import React, {useState} from 'react';
import {inputClasses, saveFormButtonClasses} from "../constants/cssClasses.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {editUserText,
        firstNameText,
        lastNameText,
        emailText,
        statusText,
        saveText
} from "../constants/texts.js";

const EditUser = () => {

    let navigate = useNavigate();
    const state = useSelector( state => state.usersData);

    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);
    const displayStatus = userIdObject.status.toString()? "Active": "Not Active";

    const [firstName, setFirstName] = useState(userIdObject.firstName);
    const [lastName, setLastName] = useState(userIdObject.lastName);
    const [email, setEmail] = useState(userIdObject.email);
    const [status, setStatus] = useState(displayStatus);

    function homeNavigate() {
        navigate(-1);
    }
    function saveHandler() {
        alert("You saved me!")
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
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                         </svg>
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
                             onChange={setFirstName}
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
                             onChange={setLastName}
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
                             onChange={setEmail}
                             className={inputClasses}
                         />
                     </div>
                     <div className="mb-2">
                         <label
                             htmlFor="email"
                             className="block text-sm font-semibold text-gray-800"
                         >
                             {statusText}
                         </label>
                         <input
                             type="text"
                             value={status}
                             onChange={setStatus}
                             className={inputClasses}
                         />
                     </div>
                     <div className="mt-6">
                         <button
                             className={saveFormButtonClasses}
                             onClick={saveHandler}>
                             {saveText}
                         </button>
                     </div>
                 </form>
            </div>
        </div>
    );
};

export default EditUser;