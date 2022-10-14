import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

const Landing = () => {
    const { loggedInUser } = useSelector((state) => state.signin);

    return (
        <>  
            <h1>Welcome</h1>
            <Signup/>
            <Signin/>
        </>
    );
};

export default Landing;
