import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import FriendPage from './components/FriendPage';
import UserList from './components/UserList';

const App = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const navigate = useNavigate();
    const page = window.location.pathname;

    useEffect(() => {
        if (!loggedInUser && page !== '/Signin') {
            return navigate('/');
        }
    }, [loggedInUser, navigate, page]);
    
    return (
        <>
            <main>
                <Routes>
                    <Route path="/" element={loggedInUser ? <Home /> : <Signup />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/users/:id" element={<Profile />} />
                    <Route path="/FriendPage" element={<FriendPage />} />
                    <Route path="/UserList" element={<UserList />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
