import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment, fetchCurrentProfile } from './stateSlices/usersSlice';
import {
    Avatar,
    Box,
    Button,
    Center,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';

const Comments = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleRemoveComment = commentId => {
        const filteredComments = currentProfile.comments.filter(
            comment => comment.commentId !== commentId
        );
        dispatch(removeComment({ id: currentProfile._id, filteredComments }));
    };

    const handleViewProfile = userId => {
        navigate(`/users/${userId}`);
    };

    return (
        <Box>
            {currentProfile.comments &&
                currentProfile.comments.map(comment => (
                    <Center py={6} key={comment.commentId}>
                        <Stack
                            borderWidth='1px'
                            borderRadius='lg'
                            w={{ sm: '100%', md: '312px' }}
                            height={{ sm: '312px', md: '15rem' }}
                            direction={{ base: 'column', md: 'row' }}
                            bg={'white'}
                            boxShadow={'lg'}
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
                                        src={comment.profileImg}
                                        size='full'
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
                                    {comment.firstName}
                                </Heading>
                                <Text
                                    textAlign={'left'}
                                    color={'gray.700'}
                                    px={3}>
                                    {comment.comment}
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
                                        onClick={() => handleViewProfile(comment.userId)}>
                                        View Profile
                                    </Button>

                                    {loggedInUser.id === comment.userId ||
                                    id === loggedInUser.id ? (
                                        <Button
                                            variant={'delete'}
                                            onClick={() =>
                                                handleRemoveComment(
                                                    comment.commentId
                                                )
                                            }>
                                            Delete
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={'secondary'}
                                            flex={1}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            _focus={{
                                                bg: 'gray.200',
                                            }}>
                                            Reply
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Center>
                ))}
        </Box>
    );
};

export default Comments;
