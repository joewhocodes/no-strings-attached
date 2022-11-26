import React from 'react';
import Home from './components/Home';
import UserList from './components/UserList';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useParams } from "react-router-dom";

const App = () => {
    const { loggedInUser } = useSelector((state) => state.signin);

    return (
        <>  
            <main>
                <Routes>
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/users/:id" element={<Profile />} />
                    <Route path={loggedInUser && `/${loggedInUser.id}`} element={<Profile />} />
                    <Route path="/" element={loggedInUser ? <Home /> : <Signup />} />
                    <Route path="/Signin" element={<Signin />} />

                </Routes>
            </main>
        </>
    );
};

export default App;
