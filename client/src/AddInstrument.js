import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react';
import axios from 'axios';

const AddInstrument = () => {
    const [newInstrument, setNewInstrument] = useState('');

    // Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setInstrument((prev) => {
    //         return {
    //             ...prev,
    //             [name]: value,
    //         };
    //     });
    // };

    const handleAddInstrument = (e) => {
        e.preventDefault();
        console.log(newInstrument);
        axios
            .post('/create', {instrument: newInstrument})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        window.location.reload();
    };

    const handleSelect=(e)=>{
        console.log(e);
        setNewInstrument(e);
    };

    return (
        <div style={{ width: '90%', margin: 'auto auto', textAlign: 'center' }}>
            <Button
                variant="dark"
                style={{ width: '10%' }}
                onClick={() => handleShow()}
            >
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Instrument</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton
                        variant="info"
                        title={newInstrument ? newInstrument : 'Choose Instrument'}
                        id="dropdown-menu-align-right"
                        onSelect={handleSelect}
                    >
                        <Dropdown.Item eventKey="Guitar">Guitar</Dropdown.Item>
                        <Dropdown.Item eventKey="Bass">Bass</Dropdown.Item>
                        <Dropdown.Item eventKey="Vocals">Vocals</Dropdown.Item>
                        <Dropdown.Item eventKey="Drums">Drums</Dropdown.Item>
                        <Dropdown.Item eventKey="Keyboard">Keyboard</Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={handleAddInstrument}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddInstrument;
