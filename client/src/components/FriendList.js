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
} from '@chakra-ui/react';

const FriendList = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { users } = useSelector((state) => state.users);
    const { id } = useParams();
    const userInfo = users.find(e => e._id === id);

    const dispatch = useDispatch();

    const handleRemoveFriend = i => {
        const friendId = users.find(e => e._id === i);
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(e => e !== i);
        const friendFilteredFriends = friendId.friends.filter(e => e !== loggedInUser.id);
        dispatch(removeFriend({friendId, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
    };

    return (
        <Flex>
            {users
                .filter((e) =>
                    id === loggedInUser.id || id === 'FriendPage'
                        ? loggedInUser.friends.includes(e._id)
                        : userInfo.friends.includes(e._id)
                )
                .map((user) => (
                    <Center py={6}>
                        <Box
                            maxW={'270px'}
                            w={'full'}
                            bg={'white'}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            overflow={'hidden'}>
                            <Image
                            h={'120px'}
                            w={'full'}
                            src={
                                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                            }
                            objectFit={'cover'}
                            />
                            <Flex justify={'center'} mt={-12}>
                            <Avatar
                                size={'xl'}
                                src={user.profileImg}
                                alt={'Author'}
                                css={{
                                border: '2px solid white',
                                }}
                            />
                            </Flex>

                            <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {user.firstName}
                                </Heading>
                                <Text color={'gray.500'}>Frontend Developer</Text>
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>23k</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Followers
                                </Text>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>23k</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Followers
                                </Text>
                                </Stack>
                            </Stack>

                            <Button
                                w={'full'}
                                mt={8}
                                bg={'#151f21'}
                                color={'white'}
                                rounded={'md'}
                                _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                                }}>
                                Follow
                            </Button>
                            </Box>
                        </Box>
                    </Center>
                ))}
        </Flex>
    );
};

export default FriendList;
