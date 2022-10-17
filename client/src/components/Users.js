import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { addInstrument } from './stateSlices/signinSlice';
import { useNavigate } from 'react-router-dom';
import AddInstrument from './AddInstrument';

const Users = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { status, users, error } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();  

    const handleAddInstrument = () => {
        dispatch(addInstrument('bass'))
        console.log('clicked')
    }

    useEffect(() => {
        console.log(users)
        if (!loggedInUser) {
            navigate('/signin');
        }
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    return (
        <div className="col-10, col-sm-8, col-md-6 mx-auto">
        <h1>Welcome back {loggedInUser.firstName}!</h1>
        <h1>Instruments {loggedInUser.instruments.skillLevel}</h1>
        <AddInstrument/>
        <button onClick={() => handleAddInstrument()}>ADD INSTRUMENT</button>
        <h2>{users.map(e => e.instruments)}</h2>
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
    );
};
export default Users;
