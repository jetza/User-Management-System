import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-full animate-pulse dark:bg-violet-800"></div>
            <div className="w-6 h-6 rounded-full animate-pulse dark:bg-violet-600"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
        </div>
    );
};

export default Spinner;