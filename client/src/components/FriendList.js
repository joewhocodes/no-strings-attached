import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFriend } from './stateSlices/usersSlice';
import { removeLocalFriend } from './stateSlices/signinSlice';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Link,
} from '@chakra-ui/react';
import AddFriend from './AddFriend';

const FriendList = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { users } = useSelector(state => state.users);
    const { id } = useParams();
    const userInfo = users.find(e => e._id === id);

    return (
        <Box>
            {users
                .filter(friend =>
                    id === loggedInUser.id
                        ? loggedInUser.friends.includes(friend._id)
                        : userInfo.friends.includes(friend._id)
                )
                .map(user => {
                    return (
                    <Center py={6}>
                        <Box
                            maxW={'320px'}
                            w={'full'}
                            bg={'white'}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            p={6}
                            textAlign={'center'}>
                            <Avatar
                                size={'xl'}
                                src={user.profileImg}
                                alt={'Avatar Alt'}
                                mb={4}
                                pos={'relative'}
                                _after={{
                                    content: '""',
                                    w: 4,
                                    h: 4,
                                    bg: 'green.300',
                                    border: '2px solid white',
                                    rounded: 'full',
                                    pos: 'absolute',
                                    bottom: 0,
                                    right: 3,
                                }}
                            />
                            <Heading fontSize={'2xl'} fontFamily={'body'}>
                                {user.firstName}
                            </Heading>
                            <Text
                                textAlign={'center'}
                                //   color={useColorModeValue('gray.700', 'gray.400')}
                                px={3}>
                                Actress, musician, songwriter and artist. PM for
                                work inquires or{' '}
                                <Link href={'#'} color={'blue.400'}>
                                    #tag
                                </Link>{' '}
                                me in your posts
                            </Text>

                            <Stack mt={8} direction={'row'} spacing={4}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}>
                                    <NavLink to={`/users/${user._id}`}>
                                        View Profile
                                    </NavLink>
                                </Button>
                                <AddFriend user={user} />
                            </Stack>
                        </Box>
                    </Center>
                )})}
        </Box>
    );
};

export default FriendList;
