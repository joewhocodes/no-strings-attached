import React, { useEffect } from 'react';
import Header from './Header';
import AddInstrument from './AddInstrument';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useLocation, useNavigate } from "react-router-dom"

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const currentProfileId = useLocation();
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser, navigate]);

    return (
        <>
            <Header />
            <h1>Profile</h1>
            <h2>Bio</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique rem libero voluptatibus magnam ex ea?
            </p>
            <h2>Location</h2>
            <p>Bristol, UK</p>
            <h1>Instruments</h1>
            <p>
                {loggedInUser.instruments.map((e, i) => <p key={i}>{Object.keys(e)} - {Object.values(e)}</p>)}
            </p>
            {loggedInUser && <AddInstrument />}
        </>
    );
};

export default Profile;
