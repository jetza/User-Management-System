import React from 'react';
import {useNavigate} from "react-router-dom";
import {Home} from "../constants/svgIcons";
import Search from "./Search";

const NavHeader = () => {

    let navigate = useNavigate();

    function homeNavigate() {
        navigate("../");
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
                        <Search/>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavHeader;