import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const EditUser = () => {

    let navigate = useNavigate();
    const state = useSelector( state => state.usersData);

    const queryParams = new URLSearchParams(window.location.search);
    const userParamId = parseInt(queryParams.get(`id`));
    const userIdObject = state.usersData.find(r => r.id === userParamId);

    const textUser = [ "Edit User", "Create User" ];
    const id = queryParams.get(`id`);

    const usersDataLabels =  [
            {key: "First Name", value: userIdObject.firstName},
            {key: "Last Name", value: userIdObject.lastName},
            {key: "User Name", value: userIdObject.userName},
            {key: "Password", value: userIdObject.password},
            {key: "Email", value: userIdObject.email},
            {key: "Status", value: userIdObject.status.toString()},
        ]

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
                     {id != null?
                         <h1 className="text-3xl font-semi-bold text-indigo-700 ml-10">
                             {textUser[0]}
                         </h1>
                         :<h1 className="text-3xl font-semi-bold text-indigo-700 ml-10">
                             {textUser[1]}
                         </h1>
                     }
                 </div>

                <form className="mt-6 ml-4">
                    {(id != null)?
                        (usersDataLabels && usersDataLabels.map((key) => {
                    return <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semi-bold text-gray-800"
                                >
                                {key.key}
                                </label>
                                <input
                                    type="text"
                                    value={key.value}
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                    })):(<div>ddd</div>)}
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            onClick={saveHandler}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;