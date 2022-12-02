import React from 'react';
import {useSelector} from "react-redux";

const List = (props) => {

    const state = useSelector(state => state.usersData);
    console.log(state.usersData)
    //create a new array by filtering the original array
    const filteredData = state.usersData.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List;
