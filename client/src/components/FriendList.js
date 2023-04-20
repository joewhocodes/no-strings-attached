import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { removeFriend } from './stateSlices/usersSlice';
import { removeLocalFriend } from './stateSlices/signinSlice';

const FriendList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const { id } = useParams();
    const userInfo = users.find(e => e._id === id);

    const dispatch = useDispatch();

    const handleRemoveFriend = i => {
        const friendId = users.find(e => e._id === i);
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(e => e !== i);
        const friendFilteredFriends = friendId.friends.filter(e => e !== loggedInUser.id);
        dispatch(removeFriend({friendId, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
    };

    return (
        <>
            <h1>Friends</h1>
            {id === loggedInUser.id && loggedInUser.friends.length === 0 ? 
                    <h3>No friends...yet. Don't worry, get on the users page and find some!</h3>
                :
                    <table className="table table-striped table-bordered table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Main Instrument</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {users
                            .filter(e => id === loggedInUser.id || id === 'FriendPage' ? loggedInUser.friends.includes(e._id) : userInfo.friends.includes(e._id))
                            .map((user) => (
                                <tr key = {user._id}>
                                    <td><NavLink to={`/users/${user._id}`}>{user.firstName}</NavLink></td>
                                    <td>{user.location}</td>
                                    <td>{user.instruments.length === 0 
                                    ? 
                                        'None added yet' 
                                    :
                                    user.instruments.map((e, i) => (
                                        <p key={i}>
                                            {Object.keys(e)} - {Object.values(e)}
                                        </p>
                                    ))}
                                    </td>
                                    {id === loggedInUser.id && 
                                        <td>
                                            <Button onClick={() => handleRemoveFriend(user._id)}>
                                                Remove Friend
                                            </Button>
                                        </td>
                                    }
                                    
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }
        </>
    );
};

export default FriendList;
