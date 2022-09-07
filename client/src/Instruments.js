import React, { useEffect, useState } from 'react';
import './Instruments.css';
import AddInstrument from './AddInstrument';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const Instruments = () => {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        axios
            .get('/posts')
            .then((res) => {
                setInstruments(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteInstrument = (id) => {
        axios
            .delete(`/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            window.location.reload();
    };


    return (
        <div>
            {instruments ? (
                <>
                    {instruments.map((instrument) => {
                        return (
                            <div
                                key={instrument._id}
                                className='instrument-card'
                            >
                                <img
                                    src={require(`./images/instrument-icons/${instrument.instrument}.png`)}
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
            )}
        </div>
    );
}

export default Instruments;