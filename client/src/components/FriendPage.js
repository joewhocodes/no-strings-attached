import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import Header from './Header';
import FriendList from './FriendList';

const FriendPage = () => {
    const { loggedInUser } = useSelector(state => state.signin);

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

    return (
        <>
            <Header />
            <div className='col-10, col-sm-8, col-md-6 mx-auto'>
                <FriendList />
            </div>
        </>
    );
};

export default FriendPage;
