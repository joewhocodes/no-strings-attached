import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from './stateSlices/usersSlice';
import { cities } from '../data/cities';
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Textarea,
    useDisclosure,
  } from '@chakra-ui/react'

const UpdateProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentProfile } = useSelector((state) => state.users);
    const { loggedInUser } = useSelector(state => state.signin);
    const [profile, setProfile] = useState({
        bio: currentProfile.bio,
        location: currentProfile.location,
    });

    const dispatch = useDispatch();

    const handleUpdateProfile = () => {
        dispatch(updateProfile({bio: profile.bio, location: profile.location, id: loggedInUser.id}));
        onClose(true);
    };

    return (
        <>
            <Button onClick={onOpen} flex={1}>
                Edit Profile
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'backing.500'}>
                        Edit Profile
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Bio</FormLabel>
                            <Textarea
                                rows={5}
                                mb={5}
                                value={profile.bio}
                                color={'secondary.800'}
                                focusBorderColor={'secondary.300'}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        bio: e.target.value,
                                    })
                                }
                            />
                            <FormLabel>Location</FormLabel>
                            <Select
                                focusBorderColor={'secondary.300'}
                                mb={1}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        location: e.target.value,
                                    })
                                }
                                defaultValue={profile.location}
                                >
                                {cities.map((city, i) => (
                                    <option value={city}>{city}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={handleUpdateProfile}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateProfile;
