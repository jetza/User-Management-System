import React from 'react';
import {useNavigate} from "react-router-dom";
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {createText} from "../constants/texts";
import {Home} from "../constants/svgIcons";

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
                                    <Home/>

                                </button>
                            </div>
                        </div>
                        <h2 className=" mb-4 text-3xl font-bold ml-4 text-indigo-700">User Management System</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div>
                                <button
                                    className={pinkButtonClasses}
                                    type="button"
                                    onClick={createUserNavigate}
                                >
                                    {createText}
                                </button>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavHeader;