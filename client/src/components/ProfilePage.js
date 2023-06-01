import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchCurrentProfile } from './stateSlices/usersSlice';
import Header from './Header';
import FriendList from './FriendList';
import Comments from './Comments';
import ProfileCard from './ProfileCard';
import { SimpleGrid, Box } from '@chakra-ui/react';

const ProfilePage = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, id, loggedInUser.token]);

    useEffect(() => {
        dispatch(fetchCurrentProfile({ currentProfileId: id }))
    }, [dispatch, id]);

    return (
        <>
            <Header />
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                <ProfileCard/>
                <Box>
                    {/* <Heading textAlign={'center'} mt={'5'}>Comments</Heading> */}
                    <Comments />
                </Box>
                <FriendList />
            </SimpleGrid>
        </>
    );
};

export default ProfilePage;
