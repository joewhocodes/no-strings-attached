import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import AddInstrument from './AddInstrument';
import EditProfile from './UpdateProfile';
import FriendList from './FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, fetchUsers } from './stateSlices/usersSlice';
import { addLocalFriend } from './stateSlices/signinSlice';
import { deleteInstrument } from './stateSlices/usersSlice';
import { deleteLocalInstrument } from './stateSlices/signinSlice';
import { useParams } from "react-router-dom";
import { removeFriend } from './stateSlices/usersSlice';
import { removeLocalFriend } from './stateSlices/signinSlice';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, loggedInUser.token]);

    useEffect(() => {
        setCurrentUser(users.filter(user => user._id === id));
    }, [id, users])

    const handleDeleteInstrument = (ins) => {
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins);
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        dispatch(deleteLocalInstrument({instruments: filteredInstruments}));
    };

    const handleAddFriend = () => {
        dispatch(addFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(addLocalFriend({friendId: id, loggedInUserId: loggedInUser.id}));
    };

    const handleRemoveFriend = i => {
        const friendId = users.find(e => e._id === i);
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(e => e !== i);
        const friendFilteredFriends = friendId.friends.filter(e => e !== loggedInUser.id);
        dispatch(removeFriend({friendId, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));

    };

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
                </>
            ) : (
            <>
            {currentUser.map((e) => (
                <>
                    <img src={`${e.profileImg}`} alt="Profile" />
                    <h1>{e.firstName}</h1>
                    {loggedInUser.friends.includes(e._id) ? (
                        <>
                            <h2>Friends &#10004;</h2>
                            <Button onClick={() => handleRemoveFriend(e._id)}>
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
                    <h2>Bio</h2>
                    <p>
                        {e.bio
                            ? e.bio
                            : `${e.firstName} hasn't written a bio yet... guess you'll just have to ask!`}
                    </p>
                    <h2>Location</h2>
                    <p>{e.location}</p>
                    <h1>Instruments</h1>
                    {e.instruments.length === 0
                        ? `${e.firstName} still needs to add some instruments!`
                        : e.instruments.map((e, i) => (
                            <p key={i}>
                                {Object.keys(e)} - {Object.values(e)}
                            </p>
                        ))}
                    <FriendList />
                </>
            ))}
            </>
            )}
        </>
    );
};

export default Profile;
