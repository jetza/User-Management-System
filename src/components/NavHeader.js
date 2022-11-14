import React from 'react';
import {useNavigate} from "react-router-dom";

const NavHeader = () => {

    let navigate = useNavigate();

    function homeNavigate() {
        navigate("../");
    }
    function createUserNavigate() {
        navigate("../create-user");
    }

    return (
        <div className="bg-gray-50">
            <nav className=" ml-5 mr-5">
                <div className="flex justify-between items-center p-4 bg-white">
                    <div className="flex items-center">

                        <div className="flex items-center space-x-2">
                            <div className="text-indigo-700">
                                <button
                                    className="text-violet-700 font-bold justify-center pb-3"
                                    type="button"
                                    onClick={homeNavigate}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                        <h2 className=" mb-4 text-3xl font-bold ml-4 text-indigo-700">User Management System</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                                <button
                                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={createUserNavigate}
                                >
                                    Create
                                </button>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavHeader;