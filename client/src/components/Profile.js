import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import AddInstrument from './AddInstrument';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteInstrument } from './stateSlices/usersSlice';

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
    }, [dispatch, loggedInUser, navigate]);

    const handleDeleteInstrument = (e) => {
        dispatch(deleteInstrument({...e, id: loggedInUser.id}));
    };

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
                {loggedInUser.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)} 
                            <Button onClick={() => handleDeleteInstrument(e)}>X</Button>
                        </p>
                ))}
            </p>
            {loggedInUser && <AddInstrument />}
        </>
    );
};

export default Profile;
