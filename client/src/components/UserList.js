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
    const [filters, setFilters] = useState({
        location: 'All',
        instrument: 'All',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        setFilteredResults(users.filter(user => user.location === filters.location));
        setFilteredResults(users.filter(user => user.instruments.find(instrument => instrument.instrument === filters.instrument)));
    }, [filters, users])

    return (
        <>
            <Header />
            <div className="col-10, col-sm-8, col-md-6 mx-auto">
                <h1>All users</h1>
                <h4>Filter By...</h4>
                <p>Location</p>
                <DropdownButton
                            variant="info"
                            title={filters.location}
                            id="dropdown-menu-align-right"
                            onSelect={e => setFilters({...filters, location: e})}
                            >   
                                <Dropdown.Item eventKey={'All'}><i>All</i></Dropdown.Item>
                                {cities.map(e => <Dropdown.Item eventKey={e}>{e}</Dropdown.Item>)}
                </DropdownButton>               
                <DropdownButton
                            variant="info"
                            title={filters.instrument}
                            id="dropdown-menu-align-right"
                            onSelect={e => setFilters({...filters, instrument: e})}
                            >   
                                <Dropdown.Item eventKey={'All'}><i>All</i></Dropdown.Item>
                                {['Guitar', 'Bass', 'Vocals', 'Drums', 'Keyboard'].map(e => <Dropdown.Item eventKey={e}>{e}</Dropdown.Item>)}
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
