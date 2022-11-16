import './AddInstrument.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useState } from 'react';
import { addInstrument } from './stateSlices/usersSlice';
import { updateInstruments } from './stateSlices/signinSlice';
import { useLocation } from "react-router-dom"

const AddInstrument = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const currentProfileId = useLocation();
    const [newInstrument, setNewInstrument] = useState({
        instrument: '',
        skillLevel: '',
    });

    const dispatch = useDispatch();
    

    const instrumentList = ['Guitar', 'Bass', 'Vocals', 'Drums', 'Keyboard'].filter(e => !loggedInUser.instruments.map(e => Object.keys(e)[0]).includes(e))
    const skillList = ['Beginner', 'Intermediate', 'Professional'];


    // Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleAddInstrument = () => {
        dispatch(addInstrument({instrument: newInstrument.instrument, skill: newInstrument.skillLevel, id: loggedInUser.id}));
        dispatch(updateInstruments({instrument: newInstrument.instrument, skill: newInstrument.skillLevel}))
        dispatch(fetchUsers({ token: loggedInUser.token }));
        handleClose();
    }

    const handleSelectInstrument = (e) => {
        setNewInstrument({
            ...newInstrument,
            instrument: e,
        });
        console.log(instrumentList)
    };

    const handleSelectSkillLevel = (e) => {
        setNewInstrument({
            ...newInstrument,
            skillLevel: e,
        });
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
                    {instrumentList.map(e => <Dropdown.Item eventKey={e} key={e}>{e}</Dropdown.Item>)}
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
                    {skillList.map(e => <Dropdown.Item eventKey={e} key={e}>{e}</Dropdown.Item>)}
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
