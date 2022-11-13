import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UsersListPage from "./pages/UsersListPage";
import EditUserPage from "./pages/EditUserPage";
import CreateUserPage from "./pages/CreateUserPage";
import AssignPermissionsPage from "./pages/AssignPermissionsPage";
//import Spinner from "./components/Spinner";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsersListPage />}/>
                <Route path="/edit-user" element={<EditUserPage />}/>
                <Route path="/create-user" element={<CreateUserPage />}/>
                <Route path="/assign-permissions" element={<AssignPermissionsPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
