import React, { useEffect, useState } from 'react';
import './Instruments.css';
import { useDispatch, useSelector } from 'react-redux';
import { addInstrument } from './stateSlices/usersSlice'

import { Button } from 'react-bootstrap';
import axios from 'axios';


const Instruments = () => {
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    
    const addInstrument = () => {
        console.log('hey')
        dispatch(addInstrument('guitar'));
    }


    const deleteInstrument = (id) => {
        axios
            .delete(`/instruments/deleteInstrument`, {data : {id: id}})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            window.location.reload();
    };


    return (
        <div>
            <button onClick={() => addInstrument()}>click</button>
            {/* <button onClick={() => addInstrumentClick()}>Click</button> */}
            {/* {instruments ? (
                <>
                    {instruments.map((instrument) => {
                        return (
                            <div
                                key={instrument._id}
                                className='instrument-card'
                            >
                                <img
                                    src={require(`../images/instrument-icons/${instrument.instrument}.png`)}
                                    alt={`${instrument.instrument}`}
                                    height="40px"
                                />
                                <h4>{instrument.instrument}</h4>
                                <h5>{instrument.skillLevel}</h5>
                                <Button
                                    onClick={() => deleteInstrument(instrument._id)}
                                    variant="outline-danger"
                                    // style={{ width: '20%' }}
                                >
                                    X
                                </Button>
                            </div>
                        );
                    })}
                    <AddInstrument/>
                </>
            ) : (
                ''
            )} */}
        </div>
    );
}

export default Instruments;