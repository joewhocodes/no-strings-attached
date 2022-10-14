import React from 'react';
import Signup from './Signup';
import Signin from './Signin';

const Landing = () => {
    return (
        <>  
            <h1>Welcome</h1>
            <Signup/>
            <Signin/>
        </>
    );
};

export default Landing;
