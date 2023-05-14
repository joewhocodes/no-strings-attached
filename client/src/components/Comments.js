import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Comments = () => {
    const { currentProfile } = useSelector((state) => state.users);
    return (
    <>
        {currentProfile && currentProfile.comments.map(c => 
            <>
                    <p>{c.firstName}</p> 
                    <p>
                        <img src={(`${c.profileImg}`)} width='100px' alt='profile of commment owner'/>
                        {c.comment}
                    </p> 
                    {/* <Button onClick={() => handleDeleteComment(c.commentId)}>
                        X
                    </Button> */}
            </>
        )}
    </>
    )
}

export default Comments;