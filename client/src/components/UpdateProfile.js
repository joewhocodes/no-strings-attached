import './AddInstrument.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateProfile } from './stateSlices/usersSlice';
import { updateLocalProfile } from './stateSlices/signinSlice';
import { cities } from '../data/cities';

const UpdateProfile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const [profile, setProfile] = useState({
        bio: '',
        location: '',
    });

    const dispatch = useDispatch();

    // Modal State
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const handleUpdateProfile = () => {
        dispatch(updateProfile({bio: profile.bio, location: profile.location, id: loggedInUser.id}));
        dispatch(updateLocalProfile({bio: profile.bio, location: profile.location}));
        handleCloseModal();
    };

    const handleSelectLocation = (e) => {
        setProfile({...profile, location: e});
    };

    return (
        <div className="add-instrument-card">
            <Button variant="dark" onClick={() => handleShowModal()}>
            Edit Profile
            </Button>

            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Location</Form.Label>
                            <DropdownButton
                            variant="info"
                            title={
                                profile.location
                                    ? profile.location
                                    : cities[0]
                            }
                            id="dropdown-menu-align-right"
                            onSelect={handleSelectLocation}
                            >
                                {cities.map(e => <Dropdown.Item eventKey={e}>{e}</Dropdown.Item>)}
                                {/* <Dropdown.Item eventKey={'Bristol, UK'}>Bristol, UK</Dropdown.Item> */}
                                {/* <Dropdown.Item eventKey={'London, UK'}>London, UK</Dropdown.Item> */}
                            </DropdownButton>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={handleUpdateProfile}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateProfile;
