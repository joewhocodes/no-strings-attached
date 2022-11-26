import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './stateSlices/signinSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutSubmitHandler = () => {
        dispatch(logout());
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                        <NavLink to={`/${loggedInUser.id}`} exact activeClassName="active">
                            Profile
                        </NavLink>
                        <NavLink to="/UserList" exact activeClassName="active">
                            Users
                        </NavLink>
                    </li>
                    <li>
                        {loggedInUser && (
                            <button
                                onClick={logoutSubmitHandler}
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign out
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
