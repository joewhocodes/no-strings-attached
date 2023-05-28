import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setCurrentProfile, deleteInstrument } from './stateSlices/usersSlice';
import { deleteLocalInstrument } from './stateSlices/signinSlice';
import Header from './Header';
import FriendList from './FriendList';
import Comments from './Comments';
import ProfileCard from './ProfileCard';
import { Center, Heading, SimpleGrid, Box } from '@chakra-ui/react';

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const { currentProfile } = useSelector((state) => state.users);
    const { id } = useParams();
    const dispatch = useDispatch();

    const loggedInUserProfile = loggedInUser.id === currentProfile._id;

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, id, loggedInUser.token]);

    useEffect(() => {
        dispatch(setCurrentProfile({ currentProfileId: id }))
    }, [dispatch, id]);

    const handleDeleteInstrument = ins => {
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins);
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        dispatch(deleteLocalInstrument({instruments: filteredInstruments}));
    };

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

export default Profile;
