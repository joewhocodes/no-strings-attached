import './AddInstrument.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateBio } from './stateSlices/usersSlice';
import { addLocalInstrument } from './stateSlices/signinSlice';

const EditProfile = () => {
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


    const handleEditProfile = () => {
        dispatch(updateBio({bio: profile.bio, location: profile.location}))
        handleCloseModal();
        // setTimeout(() => {
        //     setProfile({instrument: '', skillLevel: ''});
        // }, 1000)
    };

    const handleUpdateBio = (e) => {
        setProfile({...profile, bio: e});
    };

    const handleUpdateLocation = (e) => {
        setProfile({...profile, location: e});
    };

    return (
        <div className="add-instrument-card">
            <Button variant="dark" onClick={() => handleShowModal()}>
            Edit Profile
            </Button>

            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Bio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton
                        variant="info"
                        title={
                            setProfile.bio
                                ? setProfile.bio
                                : 'Enter Bio'
                        }
                        id="dropdown-menu-align-right"
                        onSelect={handleUpdateBio}
                    >
                    {/* {instrumentList.map(e => <Dropdown.Item eventKey={e} key={e}>{e}</Dropdown.Item>)} */}
                    </DropdownButton>
                    <DropdownButton
                        variant="info"
                        title={
                            setProfile.location
                                ? setProfile.location
                                : 'Enter Location'
                        }
                        id="dropdown-menu-align-right"
                        onSelect={handleUpdateLocation}
                    >
                    {/* {skillList.map(e => <Dropdown.Item eventKey={e} key={e}>{e}</Dropdown.Item>)} */}
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={handleEditProfile}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditProfile;
