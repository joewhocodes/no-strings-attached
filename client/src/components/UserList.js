import React, { useEffect } from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const UserList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { status, users, error } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    return (
        <>
            <Header />
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>All users</h1>
                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            ? users.map((user) => (
                                <tr>
                                    {/* <NavLink to={`users/${user._id}`} exact activeClassName="active">Profile</NavLink> */}
                                    <NavLink to={`/users/${user._id}`} exact activeClassName="active">Profile</NavLink>
                                    <td>{user._id}</td>
                                    <Link to={`/users/33`}></Link>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserList;
