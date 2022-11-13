import React from 'react';

const Spinner = () => {
    return (
        <div class="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0 text-violet-700" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;