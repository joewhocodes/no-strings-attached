import React, { useEffect } from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { loggedInUser } = useSelector((state) => state.signin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    return (
        <>
            <Header />
            <h1>Home</h1>
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>Hey {loggedInUser.firstName}!</h1>
                <img src={(`${loggedInUser.profileImg}`)} alt="Profile" />
            </div>
        </>
    );
};

export default Home;
