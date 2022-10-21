import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';

const Home = () => {
    const { loggedInUser } = useSelector((state) => state.signin);


    return (
        <>
            <Header />
            <h1>Home</h1>
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>Welcome back {loggedInUser.firstName}!</h1>
            </div>
        </>
    );
};

export default Home;
