import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './stateSlices/usersSlice';
import { nanoid } from 'nanoid';
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
} from '@chakra-ui/react';

const AddComment = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comment, setComment] = useState('');
    const { loggedInUser } = useSelector(state => state.signin);
    const { id } = useParams();

    const dispatch = useDispatch();

    const handleAddComment = () => {
        dispatch(
            addComment({
                commentId: nanoid(),
                currentProfileId: id,
                loggedInUserId: loggedInUser.id,
                firstName: loggedInUser.firstName,
                profileImg: loggedInUser.profileImg,
                comment,
            })
        );
        setComment('');
        onClose(true);
    };

    return (
        <>
            <Button onClick={onOpen} flex={1}>
                Message
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'backing.500'}>Add Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Bio</FormLabel>
                            <Textarea
                                rows={5}
                                mb={5}
                                value={comment}
                                color={'secondary.800'}
                                focusBorderColor={'secondary.300'}
                                onChange={e => setComment(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={handleAddComment}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddComment;
