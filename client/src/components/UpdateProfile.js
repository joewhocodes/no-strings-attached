import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from './stateSlices/usersSlice';
import { updateLocalProfile } from './stateSlices/signinSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './AddInstrument.css';
import { cities } from '../data/cities';
import { Button } from '@chakra-ui/react';

const UpdateProfile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const [profile, setProfile] = useState({
        bio: loggedInUser.bio,
        location: loggedInUser.location,
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
        <>
            <Button
                onClick={() => handleShowModal()}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'secondary.500'}
                color={'white'}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                    bg: 'secondary.300',
                }}
                _focus={{
                    bg: 'blue.500',
                }}>
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
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={profile.bio}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        bio: e.target.value,
                                    })
                                }
                            />
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
                                        : loggedInUser.location
                                }
                                id="dropdown-menu-align-right"
                                onSelect={handleSelectLocation}
                            >
                                {cities.map((e) => (
                                    <Dropdown.Item eventKey={e} key={e}>
                                        {e}
                                    </Dropdown.Item>
                                ))}
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
        </>
    );
};

export default UpdateProfile;
