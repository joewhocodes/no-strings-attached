import React, { useEffect } from 'react';
import Header from './Header';
import AddInstrument from './AddInstrument';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
            <h1>Profile</h1>
            <h2>Bio</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rem libero voluptatibus magnam ex ea?</p>
            <h2>Location</h2>
            <p>Bristol, UK</p>
            <h1>Instruments</h1>
            {/* <h1>{loggedInUser.instruments.map(e => e.instrument)}</h1> */}
                {/* {users[0].instruments.length > 0 ? (
                    <ul>
                        <li>{users[0].instruments.map((e) => e.instrument + " " + e.skillLevel)}</li>
                    </ul>
                ) : (
                    <h1>no</h1>
                )} */}
            {loggedInUser && <AddInstrument />}
        </>
    );
};

export default Profile;
