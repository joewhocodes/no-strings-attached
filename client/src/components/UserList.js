import React, { useState, useEffect } from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import { cities } from '../data/cities';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const UserList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const [filteredResults, setFilteredResults] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    const filterByLocation = loc => {
        if (loc === "All") {
            setFilteredResults(users)
        } else {
            setFilteredResults(users.filter(e => e.location === loc));
        }
    };

    const filterAll = () => {

        setFilteredResults(users);
        // setActive("all")
    };

    return (
        <>
            <Header />
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>All users</h1>
                <h4>Filter By...</h4>
                <p>Location</p>
                <DropdownButton
                            variant="info"
                            title={ "All"}
                            id="dropdown-menu-align-right"
                            onSelect={e => filterByLocation(e)}
                            >   
                                <Dropdown.Item eventKey={'All'}><i>All</i></Dropdown.Item>
                                {cities.map(e => <Dropdown.Item eventKey={e}>{e}</Dropdown.Item>)}
                </DropdownButton>

                <table className="table table-striped table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Main Instrument</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredResults
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
