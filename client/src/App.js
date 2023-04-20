import React from 'react';
import Home from './components/Home';
import UserList from './components/UserList';
import FriendPage from './components/FriendPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    const { loggedInUser } = useSelector((state) => state.signin);

    return (
        <>
            <main>
                <Routes>
                    <Route path="/" element={loggedInUser ? <Home /> : <Signup />} />
                    <Route path="/users/:id" element={<Profile />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/FriendPage" element={<FriendPage />} />
                    <Route path="/UserList" element={<UserList />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
