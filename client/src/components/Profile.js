import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import AddInstrument from './AddInstrument';
import EditProfile from './EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteInstrument } from './stateSlices/usersSlice';
import { deleteLocalInstrument } from './stateSlices/signinSlice';
import { useParams } from "react-router-dom";

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { id } = useParams();
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = users.find(e => e._id === id);

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
    }, [dispatch, loggedInUser, navigate]);

    const handleDeleteInstrument = (ins) => {
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins);
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        dispatch(deleteLocalInstrument({instruments: filteredInstruments}));
    };

    return (
        <>
            <Header />
            <h1>{userInfo.firstName}</h1>
            {id === loggedInUser.id && <EditProfile/>}
            <h2>Bio</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Similique rem libero voluptatibus magnam ex ea?
                
            </p>
            <h2>Location</h2>
            <p>Bristol, UK</p>
            <h1>Instruments</h1>
            <p>
                { id === loggedInUser.id ? 
                    <>
                    {loggedInUser.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)} 
                            <Button onClick={() => handleDeleteInstrument(e)}>X</Button>
                        </p>
                    ))}
                    <AddInstrument/>
                    </>
                :
                    userInfo.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)} 
                        </p>
                    ))
                }
            </p>
        </>
    );
};

export default Profile;
