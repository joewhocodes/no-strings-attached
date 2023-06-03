import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddRemoveFriend from './AddRemoveFriend';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
} from '@chakra-ui/react';

const FriendList = () => {
    const { users } = useSelector(state => state.users);
    const { id } = useParams();
    const userInfo = users.find(e => e._id === id);
    const navigate = useNavigate();
    
    const handleViewProfile = userId => {
        navigate(`/users/${userId}`);
    };

    return (
        <Box>
            {users
                .filter(user => userInfo.friends.includes(user._id))
                .map(user => {
                    return (
                    <Center py={6} key={user._id}>
                        <Box
                            maxW={'320px'}
                            // minH={'198px'}
                            w={'full'}
                            bg={'white'}
                            boxShadow={'lg'}
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
                                minH={'20px'}
                                //   color={useColorModeValue('gray.700', 'gray.400')}
                                px={3}>
                                {user.bio}
                            </Text>

                            <Stack mt={8} direction={'row'} spacing={4}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}
                                    onClick={() => handleViewProfile(user._id)}
                                    >
                                        View Profile
                                </Button>
                                <AddRemoveFriend user={user} />
                            </Stack>
                        </Box>
                    </Center>
                )})}
        </Box>
    );
};

export default FriendList;
