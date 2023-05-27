import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setCurrentProfile } from './stateSlices/usersSlice';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { nanoid } from 'nanoid';
import './AddInstrument.css';

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
                friendId: id,
                loggedInUserId: loggedInUser.id,
                firstName: loggedInUser.firstName,
                profileImg: loggedInUser.profileImg,
                comment,
            })
        );
        dispatch(setCurrentProfile({ currentProfileId: id }))
        setComment('');
        handleCloseModal();
    };

    return (
        <div className="add-instrument-card">
            <Button variant="dark" onClick={() => handleShowModal()}>
                Add Comment
            </Button>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => handleAddComment()}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddComment;