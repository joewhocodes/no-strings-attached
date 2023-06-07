import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/ProfilePage';
import UserList from './components/UserList';
import { Box } from '@chakra-ui/react';

const App = () => {
    const { loggedInUser } = useSelector(state => state.signin);

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        }
    }, [loggedInUser]);

    return (
        <>
            <Box bg='primary.10'>
                <Routes>
                    <Route
                        path='/'
                        element={loggedInUser ? <Home /> : <Signup />}
                    />
                    <Route
                        path='/Signin'
                        element={
                            loggedInUser ? <Navigate to='/' /> : <Signin />
                        }
                    />
                    <Route
                        element={
                            loggedInUser ? <Outlet /> : <Navigate to='/' />
                        }>
                        <Route path='/users/:id' element={<Profile />} />
                        <Route path='/UserList' element={<UserList />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Box>
        </>
    );
};

export default App;
