import React from 'react';
import {CheckIcon} from "../constants/svgIcons";

const Notification  = () => {
    return (
        <>
            <div
                className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border rounded-md shadow-lg bg-gradient-to-tr from-indigo-600 to-purple-600"
                role="alert">
                <div className="flex p-4">
                    <div className="ml-auto flex items-center gap-2 space-x-3">
                        <CheckIcon/>
                    </div>
                    <p className="text-sm text-white">
                        Hello pretty
                    </p>
                </div>
            </div>
        </>
    );
};

export default Notification ;
