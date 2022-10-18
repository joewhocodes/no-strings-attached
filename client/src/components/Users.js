import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addInstrument } from './stateSlices/usersSlice';
import { useNavigate } from 'react-router-dom';
import AddInstrument from './AddInstrument';

const Users = () => {
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
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>Welcome back {loggedInUser.firstName}!</h1>
                <AddInstrument />
                <h1>Instruments</h1>
                {/* {users[0].instruments.length > 0 ? (
                    <ul>
                        <li>{users[0].instruments.map((e) => e.instrument + " " + e.skillLevel)}</li>
                    </ul>
                ) : (
                    <h1>no</h1>
                )} */}
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
                                      {/* <td>{loggedInUser}</td> */}
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default Users;
