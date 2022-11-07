import React from 'react';
import UserList from "../components/UserList"
import NavHeader from "../components/NavHeader";

const UsersListPage = () => {
    return (
        <div>
            <NavHeader />
            <UserList />
        </div>
    );
};

export default UsersListPage;