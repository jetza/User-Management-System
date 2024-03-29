import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteUserData} from "../store/usersData/userRequestActions";
import {pinkButtonClasses} from "../constants/cssClasses.js";
import {
    deleteUserText,
    questionDeleteUserText,
    discardText,
    deleteText
} from "../constants/texts"

//TODO: close modal when clicked outside
const DeleteModal = ({id}) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const deleteUser = () => {
        setShowModal(false);
        dispatch(deleteUserData(id));
    }

    return (
        <>
            <button
                className={pinkButtonClasses}
                type="button"
                onClick={() => setShowModal(true)}
            >
                {deleteText}
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {deleteUserText}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                    <span
                                        className="bg-transparent text-gray-700 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-lg leading-relaxed font-bold text-indigo-700">
                                        {questionDeleteUserText}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid gap-4 border-slate-200 rounded-b">
                                    <button
                                        className="bg-white text-indigo-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        {discardText}
                                    </button>
                                    <button
                                        className="bg-indigo-700 text-white active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={deleteUser}
                                    >
                                        {deleteText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default DeleteModal;