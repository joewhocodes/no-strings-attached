import './AddInstrument.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addInstrument } from './stateSlices/usersSlice';

const AddInstrument = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const [newInstrument, setNewInstrument] = useState({
        instrument: '',
        skillLevel: '',
    });

    const dispatch = useDispatch();

    const instrumentList = ['Guitar', 'Bass', 'Vocals', 'Drums', 'Keyboard'].filter(e => e !== loggedInUser.instruments[0].instrument);
    const skillList = ['Beginner', 'Intermediate', 'Professional'];


    // Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddInstrument = () => {
        dispatch(addInstrument({instrument: newInstrument.instrument, skill: newInstrument.skillLevel, id: loggedInUser.id}));
        handleClose();
    }

    const handleSelectInstrument = (e) => {
        setNewInstrument({
            ...newInstrument,
            instrument: e,
        });
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
