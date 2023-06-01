import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstrument, fetchCurrentProfile } from './stateSlices/usersSlice';
import { addLocalInstrument } from './stateSlices/signinSlice';
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
    useDisclosure,
} from '@chakra-ui/react';

const AddInstrument = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loggedInUser } = useSelector(state => state.signin);
    const [newInstrument, setNewInstrument] = useState({
        instrument: '',
        skillLevel: '',
    });

    const dispatch = useDispatch();

    // Filter user instruments so only new ones appear in Modal
    const instrumentList = [
        'Guitar',
        'Bass',
        'Vocals',
        'Drums',
        'Keyboard',
    ].filter(
        instrument =>
            !loggedInUser.instruments
                .map(instrument => Object.keys(instrument)[0])
                .includes(instrument)
    );
    const skillList = ['Beginner', 'Intermediate', 'Professional'];

    const handleAddInstrument = () => {
        if (!newInstrument.instrument || !newInstrument.skillLevel) return;
        dispatch(
            addInstrument({
                instrument: newInstrument.instrument,
                skill: newInstrument.skillLevel,
                id: loggedInUser.id,
            })
        );
        dispatch(
            addLocalInstrument({
                instrument: newInstrument.instrument,
                skill: newInstrument.skillLevel,
            })
        );
        onClose(true);
    };

    return (
        <>
            {instrumentList &&
                <Button onClick={onOpen} flex={1}>
                    Add Instrument
                </Button>
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'backing.500'}>Instruments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Instrument</FormLabel>
                            <Select
                                mb={'5'}
                                onChange={e =>
                                    setNewInstrument({
                                        ...newInstrument,
                                        instrument: e.target.value,
                                    })
                                }>
                                {instrumentList.map(instrument => (
                                    <option value={instrument}>
                                        {instrument}
                                    </option>
                                ))}
                            </Select>
                            <FormLabel>Skill</FormLabel>
                            <Select
                                mb={'5'}
                                onChange={e =>
                                    setNewInstrument({
                                        ...newInstrument,
                                        skillLevel: e.target.value,
                                    })
                                }>
                                {skillList.map(skill => (
                                    <option value={skill}>{skill}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={handleAddInstrument}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddInstrument;
