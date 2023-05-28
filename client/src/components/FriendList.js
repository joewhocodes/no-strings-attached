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
    Badge
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
        <Box>
            {users
                .filter((e) =>
                    id === loggedInUser.id || id === 'FriendPage'
                        ? loggedInUser.friends.includes(e._id)
                        : userInfo.friends.includes(e._id)
                )
                .map((user) => (
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
                        Actress, musician, songwriter and artist. PM for work inquires or{' '}
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
                            <NavLink to={`/users/${user._id}`}>View Profile</NavLink>
                        </Button>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                            bg: 'blue.500',
                            }}
                            _focus={{
                            bg: 'blue.500',
                            }}>
                            Follow
                        </Button>
                        </Stack>
                    </Box>
                    </Center>
                ))}
        </Box>
    );
};

export default FriendList;
