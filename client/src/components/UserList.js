import React, { useEffect } from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';

const UserList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, loggedInUser]);

    return (
        <>
            <Header />
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>All users</h1>
                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Main Instrument</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users
                        .filter(e => e._id !== loggedInUser.id)
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
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserList;
