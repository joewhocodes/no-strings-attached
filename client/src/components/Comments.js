import React from 'react';
import { useParams } from "react-router-dom";

const Comments = () => {
    const { id } = useParams();
    return (
    // <h1>Hello world</h1>
    {e.comments.map(c => 
        <>
            <p>{c.firstName}</p> 
            <p>
                <img src={(`${c.profileImg}`)} width='100px' alt='profile of commment owner'/>
                {c.comment}
            </p> 
            <Button onClick={() => handleDeleteComment(c.commentId)}>
                X
            </Button>
        </>
    )}
    )
}

export default Comments;