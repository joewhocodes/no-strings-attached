import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchCurrentProfile } from './stateSlices/usersSlice';
import Header from './Header';
import FriendList from './FriendList';
import Comments from './Comments';
import ProfileCard from './ProfileCard';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons';

const ProfilePage = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, id, loggedInUser.token]);

    useEffect(() => {
        dispatch(fetchCurrentProfile({ currentProfileId: id }));
        setLoading(false);
    }, [dispatch, id]);

    return (
        <Box maxH={'100vh'}>
            <Header />
            {loading ? (
                <SpinnerIcon />
            ) : (
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} minH={'100vh'}>
                    <ProfileCard />
                    {/* <Heading textAlign={'center'} mt={'5'}>Comments</Heading> */}
                    <Comments />
                    <FriendList />
                </SimpleGrid>
            )}
        </Box>
    );
};

export default ProfilePage;
