import React from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Header from './components/Header';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
