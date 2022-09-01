import './AddInstrument.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import axios from 'axios';

const AddInstrument = () => {
    const [newInstrument, setNewInstrument] = useState({
        instrument: '',
        skillLevel: '',
    });

    // Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddInstrument = (e) => {
        e.preventDefault();
        axios
            .post('/create', newInstrument)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        window.location.reload();
    };

    const handleSelectInstrument = (e) => {
        setNewInstrument({
            ...newInstrument,
            instrument: e,
        });
        console.log(newInstrument)
    };

    const handleSelectSkillLevel = (e) => {
        setNewInstrument({
            ...newInstrument,
            skillLevel: e,
        });
        console.log(newInstrument)
    };

    return (
        <div className="add-instrument-card">
            <h3>Add New</h3>
            <Button variant="dark" onClick={() => handleShow()}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Instrument</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton
                        variant="info"
                        title={
                            newInstrument.instrument
                                ? newInstrument.instrument
                                : 'Select Instrument'
                        }
                        id="dropdown-menu-align-right"
                        onSelect={handleSelectInstrument}
                    >
                        <Dropdown.Item eventKey="Guitar">Guitar</Dropdown.Item>
                        <Dropdown.Item eventKey="Bass">Bass</Dropdown.Item>
                        <Dropdown.Item eventKey="Vocals">Vocals</Dropdown.Item>
                        <Dropdown.Item eventKey="Drums">Drums</Dropdown.Item>
                        <Dropdown.Item eventKey="Keyboard">
                            Keyboard
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        variant="info"
                        title={
                            newInstrument.skillLevel
                                ? newInstrument.skillLevel
                                : 'Select Skill Level'
                        }
                        id="dropdown-menu-align-right"
                        onSelect={handleSelectSkillLevel}
                    >
                        <Dropdown.Item eventKey="Beginner">
                            Beginner
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Intermediate">
                            Intermediate
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Professional">
                            Professional
                        </Dropdown.Item>
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
