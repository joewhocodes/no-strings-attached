import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstrument } from './stateSlices/usersSlice';
import { addLocalInstrument } from './stateSlices/signinSlice';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './AddInstrument.css';

const AddInstrument = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const [newInstrument, setNewInstrument] = useState({
        instrument: '',
        skillLevel: '',
    });

    const dispatch = useDispatch();

    // Filter user instruments so only new ones appear in Modal
    const instrumentList = ['Guitar', 'Bass', 'Vocals', 'Drums', 'Keyboard'].filter(e => !loggedInUser.instruments.map(e => Object.keys(e)[0]).includes(e));
    const skillList = ['Beginner', 'Intermediate', 'Professional'];

    // Modal State
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const handleAddInstrument = () => {
        if (!newInstrument.instrument || !newInstrument.skillLevel) return;
        dispatch(addInstrument({instrument: newInstrument.instrument, skill: newInstrument.skillLevel, id: loggedInUser.id}));
        dispatch(addLocalInstrument({instrument: newInstrument.instrument, skill: newInstrument.skillLevel}));
        handleCloseModal();
        setTimeout(() => {
            setNewInstrument({instrument: '', skillLevel: ''});
        }, 1000)
    };

    const handleSelectInstrument = e => setNewInstrument({...newInstrument, instrument: e});

    const handleSelectSkillLevel = e => setNewInstrument({...newInstrument, skillLevel: e});

    return (
        <div className="add-instrument-card">
            <h3>Add New</h3>
            <Button variant="dark" onClick={() => handleShowModal()}>
                +
            </Button>
            <Modal show={show} onHide={handleCloseModal}>
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
                    <Button variant="secondary" onClick={handleCloseModal}>
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
