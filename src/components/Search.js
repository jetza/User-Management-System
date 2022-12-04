import React, {useState} from 'react';
import {SearchIcon} from "../constants/svgIcons";
import {useSelector} from "react-redux";


const Search = () => {

    const state = useSelector(state => state.usersData);
    const [inputText, setInputText] = useState("");

    //find a value in array of objects and set it in array variable
    const inputHandler = () => {
        let array = [];
        array.push(state.usersData.filter
        (r => (r.firstName.indexOf(inputText)  || r.lastName.indexOf(inputText) || r.email.indexOf(inputText)
            || r.userName.indexOf(inputText)) !== -1));
            // state.usersData.filter(item => item.lastName.indexOf(inputText) !== -1) ||
            // state.usersData.filter(item => item.userName.indexOf(inputText) !== -1) ||
            // state.usersData.filter(item => item.email.indexOf(inputText) !== -1));
        //array = state.usersData.find(r => (r.firstName || r.lastName || r.email || r.userName) === inputText);
        console.log(array)

    };

    return (
        <div className="flex items-center">
            <div className="flex space-x-1">
                <input type="text"
                       value={inputText}
                       className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       placeholder="Search..."
                       onChange={(e) => setInputText(e.target.value)}
                />
                <button className="px-4 text-white bg-purple-600 rounded-full "
                        onClick={inputHandler}>
                    <SearchIcon/>
                </button>
            </div>
        </div>
    );
};

export default Search;
