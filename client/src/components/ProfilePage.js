import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchCurrentProfile } from './stateSlices/usersSlice';
import Header from './Header';
import FriendList from './FriendList';
import Comments from './Comments';
import ProfileCard from './ProfileCard';
import { Center, SimpleGrid, Box, Image, Spinner } from '@chakra-ui/react';
import comments from '../images/comments.png';
import friends from '../images/friends.png';

const ProfilePage = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const [isloading, setIsloading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, id, loggedInUser.token]);

    useEffect(() => {
        setIsloading(true);
        dispatch(fetchCurrentProfile({ currentProfileId: id }));
        setTimeout(() => {
            setIsloading(false)
        }, 1000);
    }, [dispatch, id]);

    return (
        <Box maxH={'100vh'}>
            <Header />
            {isloading ? (
                <Center>
                    <Spinner size='xl' color='backing.500' mt='50vh'/>
                </Center>
            ) : (
                <SimpleGrid
                    columns={{ base: 1, lg: 3 }}
                    spacing={5}
                    minH={'100vh'}>
                    <ProfileCard />
                    <Box mt={'72px'} textAlign={'center'}>
                        <Image
                            src={comments}
                            margin={'auto'}
                            width='200px'></Image>
                        <Box maxH={'80vh'} overflow={'scroll'}>
                            <Comments />
                        </Box>
                    </Box>
                    <Box mt={'72px'} textAlign={'center'}>
                        <Image
                            src={friends}
                            margin={'auto'}
                            width='160px'></Image>
                        <Box maxH={'80vh'} overflow={'scroll'}>
                            <FriendList />
                        </Box>
                    </Box>
                </SimpleGrid>
            )}
        </Box>
    );
};

export default ProfilePage;
