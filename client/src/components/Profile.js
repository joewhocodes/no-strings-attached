import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import AddInstrument from './AddInstrument';
import EditProfile from './UpdateProfile';
import FriendList from './FriendList';
import AddComment from './AddComment';
import Comments from './Comments';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, fetchUsers, setCurrentProfile, deleteInstrument, removeFriend, deleteComment } from './stateSlices/usersSlice';
import { addLocalFriend, deleteLocalInstrument, removeLocalFriend } from './stateSlices/signinSlice';
import { useParams } from "react-router-dom";

const Profile = () => {
    const [isLoading, setLoading] = useState([]);
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const { currentProfile } = useSelector((state) => state.users);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, id, loggedInUser.token]);

    useEffect(() => {
        dispatch(setCurrentProfile({ currentProfileId: id }))
    }, [dispatch, id]);

    const handleDeleteInstrument = ins => {
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins);
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        dispatch(deleteLocalInstrument({instruments: filteredInstruments}));
    };

    const handleAddFriend = () => {
        dispatch(addFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(addLocalFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    const handleRemoveFriend = i => {
        const friendId = users.find(e => e._id === i);
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(e => e !== i);
        const friendFilteredFriends = friendId.friends.filter(e => e !== loggedInUser.id);
        dispatch(removeFriend({friendId, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    const handleDeleteComment = commentId => {
        console.log(`comment id is ${commentId}`)
        console.log(`current user comments are ${currentProfile.map(e => e.comments)}`)
        const filteredComments = currentProfile.comments.filter(e => e.commentId !== commentId);
        console.log(`filtered comments are ${filteredComments}`)
        dispatch(deleteComment({filteredComments}));
    }

    return (
        <>
            <Header />
            {id === loggedInUser.id ? (
                    <>
                        <img src={(`${loggedInUser.profileImg}`)} alt="Profile" />
                        <h1>{loggedInUser.firstName}</h1>
                        <EditProfile />
                        <h2>Bio</h2>
                        <p>
                            {loggedInUser.bio
                                ? loggedInUser.bio
                                : "You haven't written a bio yet... write a little bit about yourself so others can get to know you!"}
                        </p>
                        <h2>Location</h2>
                        <p>{loggedInUser.location}</p>                            

                        <h1>Instruments</h1>
                        {loggedInUser.instruments.map((e, i) => (
                            <p key={i}>
                                {Object.keys(e)} - {Object.values(e)}
                                <Button onClick={() => handleDeleteInstrument(e)}>
                                    X
                                </Button>
                            </p>
                        ))}
                        <AddInstrument />
                        <FriendList/>
                        <h1>Comments</h1>
                        {loggedInUser.comments.map(c =>
                            <>
                                <p>{c.firstName}</p> 
                                <p>
                                    <img src={(`${c.profileImg}`)} width='100px' alt='profile of commment owner'/>
                                    {c.comment}
                                </p> 
                            </>    
                        )}
                    </>
                ) : (
                    <>
                        {currentProfile && (
                            <>
                                <img src={`${currentProfile.profileImg}`} alt="Profile" />
                                <h1>{currentProfile.firstName}</h1>
                                <h2>Bio</h2>
                                <p>
                                    {currentProfile.bio
                                        ? currentProfile.bio
                                        : `${currentProfile.firstName} hasn't written a bio yet... guess you'll just have to ask!`}
                                </p>
                                <h2>Location</h2>
                                <p>{currentProfile.location}</p>
                                <h1>Instruments</h1>
                                {/* {currentProfile.instruments.length === 0
                                    ? `${currentProfile.firstName} still needs to add some instruments!`
                                    : currentProfile.instruments.map((e, i) => (
                                        <p key={i}>
                                            {e.instrument} - {e.skill}
                                        </p>
                                    ))} */}

                                {loggedInUser.friends.includes(currentProfile._id) ? (
                                    <>
                                        <h2>Friends &#10004;</h2>
                                        <Button onClick={() => handleRemoveFriend(currentProfile._id)}>
                                            Remove Friend
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="dark"
                                            onClick={() => handleAddFriend()}
                                        >
                                            Add Friend
                                        </Button>
                                    </>
                                )}
                                <FriendList />
                                <h1>Comments</h1>
                                <AddComment/>
                                <Comments/>
                            </>
                        )}
                    </>
                )
            }
        </>
    );
};

export default Profile;
