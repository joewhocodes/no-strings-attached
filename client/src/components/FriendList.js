import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { removeFriend } from './stateSlices/usersSlice';
import { removeLocalFriend } from './stateSlices/signinSlice';

const FriendList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser, navigate]);

    const handleRemoveFriend = (i) => {
        const filteredFriends = loggedInUser.friends.filter(e => e !== i)
        dispatch(removeFriend({filteredFriends: filteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({filteredFriends: filteredFriends, loggedInUserId: loggedInUser.id}));
    };

    return (
        <>
            <Header />
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>Friends</h1>
                {loggedInUser.friends.length === 0 ? 
                        <h3>No friends...yet. Don't worry, get on the users page and find some!</h3>
                    :
                        <table className="table table-striped table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Main Instrument</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {users
                                .filter(e => loggedInUser.friends.includes(e._id))
                                .map((user) => (
                                    <tr key = {user._id}>
                                        <td><NavLink to={`/users/${user._id}`}>{user.firstName}</NavLink></td>
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
                                        <td>
                                            <Button onClick={() => handleRemoveFriend(user._id)}>
                                                X
                                            </Button>
                                        </td>
                                        
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                }
            </div>
        </>
    );
};

export default FriendList;
