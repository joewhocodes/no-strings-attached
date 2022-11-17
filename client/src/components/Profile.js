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

    const handleDeleteInstrument = (ins) => {
        console.log(loggedInUser.instruments.filter(e => e !== ins))
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins)
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}))
        // console.log(ins)
        // const asArray = Object.entries(loggedInUser.instruments);
        // const filtered = asArray.filter(([key, value]) => key == 'Vocals');
        // console.log(asArray)
        // console.log(filtered)
        // const newInstruments = loggedInUser.instruments.filter(e => !loggedInUser.instruments.map(e => Object.keys(e)[0]).includes(e));
        // const newInstruments = loggedInUser.instruments.map(e => Object.keys(e)[0]).filter(e => e !== Object.keys(ins)[0]);
        // const newInstruments = loggedInUser.instruments.map(e => Object.keys(e)[0])
        // console.log(newInstruments)
        // dispatch(deleteInstrument({...e, id: loggedInUser.id, instruments: loggedInUser.instruments}));
        // console.log(Object.keys(ins)[0])
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
