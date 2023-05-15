import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from './stateSlices/usersSlice';
import { Button } from 'react-bootstrap';

const Comments = () => {
    const { currentProfile } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleDeleteComment = commentId => {
        console.log(`comment id is ${commentId}`)
        console.log(`current user comments are ${currentProfile.map(e => e.comments)}`)
        const filteredComments = currentProfile.comments.filter(e => e.commentId !== commentId);
        console.log(`filtered comments are ${filteredComments}`)
        dispatch(deleteComment({filteredComments}));
    }

    return (
        <>
            {currentProfile && currentProfile.comments.map(c => 
                <React.Fragment key={c.firstName}>
                        <p>{c.firstName}</p> 
                        <p>
                            <img src={(`${c.profileImg}`)} width='100px' alt='profile of commment owner'/>
                            {c.comment}
                        </p> 
                        <Button onClick={() => handleDeleteComment(c.commentId)}>
                            X
                        </Button>
                </React.Fragment>
            )}
        </>
    )
}

export default Comments;