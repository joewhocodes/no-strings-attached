import React from 'react';
import Header from './Header';
import Instruments from './Instruments';
import Users from './Users';

const Home = () => {
    return (
        <>
            <Header />
            <h1>Home</h1>
            <Instruments />
            <Users />
        </>
    );
};

export default Home;
