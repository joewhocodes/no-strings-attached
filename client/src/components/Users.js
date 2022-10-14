import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { status, users, error } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser || !loggedInUser.isAdmin) {
            navigate('/signin');
        }
        if (loggedInUser && loggedInUser.isAdmin) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    return (
        <div className="col-10, col-sm-8, col-md-6 mx-auto">
            <h1>Registered Email IDs</h1>
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
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </table>
        </div>
    );
};
export default Users;
