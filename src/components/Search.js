import React, {useState} from 'react';
import {SearchIcon} from "../constants/svgIcons";


const Search = () => {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="flex items-center">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button className="px-4 text-white bg-purple-600 rounded-full "
                        onChange={inputHandler}>
                    <SearchIcon/>
                </button>
            </div>
        </div>
    );
};

export default Search;
