import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInstrument } from './stateSlices/usersSlice';
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
    const { currentProfile } = useSelector((state) => state.users);
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
            !currentProfile.instruments
                .map(e => Object.values(e)[0])
                .includes(instrument)
    );

    const skillList = ['Beginner', 'Intermediate', 'Professional'];

    const handleAddInstrument = () => {
        // if (!newInstrument.instrument || !newInstrument.skillLevel) return;
        dispatch(
            addInstrument({
                instrument: newInstrument.instrument,
                skill: newInstrument.skillLevel,
                id: currentProfile._id,
            })
        );
        onClose(true);
    };

    return (
        <>
            <Button
                onClick={() => (
                    onOpen(),
                    setNewInstrument({
                        instrument: instrumentList[0],
                        skillLevel: skillList[0],
                    })
                )}
                flex={1}
                isDisabled={!instrumentList.length}
                _hover={!instrumentList.length ? {bg: 'secondary.600'} : {bg: 'green.500'}}
                >
                Add Instrument
            </Button>

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
                                {instrumentList.map((instrument, i) => (
                                    <option
                                        key={instrument}
                                        value={instrument}>
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
                                    <option value={skill} key={skill}>{skill}</option>
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
