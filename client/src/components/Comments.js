import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, fetchUsers } from './stateSlices/usersSlice';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const Comments = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleDeleteComment = commentId => {
        const filteredComments = currentProfile.comments.filter(
            e => e.commentId !== commentId
        );
        dispatch(deleteComment({ id: currentProfile._id, filteredComments }));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    return (
        <>
            {/* <Heading>Comments</Heading> */}
            {currentProfile.comments &&
                currentProfile.comments.map(user => (
                    <Center py={6}>
                        <Stack
                            borderWidth='1px'
                            borderRadius='lg'
                            w={{ sm: '100%', md: '312px' }}
                            height={{ sm: '312px', md: '15rem' }}
                            direction={{ base: 'column', md: 'row' }}
                            bg={'white'}
                            boxShadow={'2xl'}
                            padding={4}>
                            <Stack
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='left'
                                p={1}
                                pt={2}>
                                <Box
                                    as='div'
                                    position='relative'
                                    w={'96px'}
                                    h={'96px'}>
                                    <Avatar
                                        src='https://i.pravatar.cc/300'
                                        size='full'
                                        position='absolute'
                                        top={0}
                                    />
                                </Box>
                                </Stack>
                            <Stack
                                flex={1}
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='left'
                                p={1}
                                pt={2}>
                                <Heading
                                    fontSize={'2xl'}
                                    textAlign={'left'}
                                    fontFamily={'body'}
                                    px={3}>
                                    {user.firstName}
                                </Heading>
                                <Text
                                    textAlign={'left'}
                                    color={'gray.700'}
                                    px={3}>
                                    {user.comment}
                                </Text>

                                <Stack
                                    width={'100%'}
                                    mt={'2rem'}
                                    direction={'row'}
                                    padding={2}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}>
                                    <Button
                                        flex={1}
                                        fontSize={'sm'}
                                        rounded={'full'}
                                        _focus={{
                                            bg: 'gray.200',
                                        }}>
                                        Reply
                                    </Button>
                                    {loggedInUser.id === user.userId || id === loggedInUser.id ? (
                                        <Button
                                            flex={1}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            bg={'red.400'}
                                            _focus={{
                                                bg: 'gray.200',
                                            }}
                                            onClick={() =>
                                                handleDeleteComment(
                                                    user.commentId
                                                )
                                            }>
                                            Delete
                                        </Button>
                                    ) : (
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
                                    
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Center>

                    //     <p>
                    //         <Heading>Comments</Heading>
                    //         {c.firstName}
                    //         <img
                    //             src={`${c.profileImg}`}
                    //             width='100px'
                    //             alt='profile image'
                    //         />
                    //         {c.comment}

                    //     </p>
                ))}
        </>
    );
};

export default Comments;
