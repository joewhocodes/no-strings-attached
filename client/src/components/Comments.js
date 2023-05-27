import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, fetchUsers } from './stateSlices/usersSlice';
import { Button } from 'react-bootstrap';

const Comments = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { currentProfile } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleDeleteComment = commentId => {
        const filteredComments = currentProfile.comments.filter(e => e.commentId !== commentId);
        dispatch(deleteComment({id : currentProfile._id, filteredComments}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }

    return (
        <>
            {currentProfile.comments && currentProfile.comments.map(c => 
                <React.Fragment>
                        <p>{c.firstName}</p> 
                        <p>
                            <img src={(`${c.profileImg}`)} width='100px' alt='profile of commment owner'/>
                            {c.comment}
                        </p> 
                        {loggedInUser.id === c.userId &&
                            <Button onClick={() => handleDeleteComment(c.commentId)}>
                                X
                            </Button>
                        }
                </React.Fragment>
            )}
        </>
    )
}

export default Comments;