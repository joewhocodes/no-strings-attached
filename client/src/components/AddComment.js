import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './stateSlices/usersSlice';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { nanoid } from 'nanoid';
import { Button } from '@chakra-ui/react';

const AddComment = () => {
    const [comment, setComment] = useState('');
    const { loggedInUser } = useSelector((state) => state.signin);
    const { id } = useParams();

    const dispatch = useDispatch();

    // Modal State
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

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
        handleCloseModal();
    };

    return (
        <>
            <Button
                onClick={() => handleShowModal()}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}>
                Message
            </Button>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className='mb-3'
                            controlId='exampleForm.ControlTextarea1'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                    <Button
                        variant='outline-success'
                        onClick={() => handleAddComment()}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddComment;
