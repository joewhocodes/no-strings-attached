import React, { useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, fetchUsers, setCurrentProfile, deleteInstrument, removeFriend } from './stateSlices/usersSlice';
import { addLocalFriend, deleteLocalInstrument, removeLocalFriend } from './stateSlices/signinSlice';
import Header from './Header';
import AddInstrument from './AddInstrument';
import EditProfile from './UpdateProfile';
import FriendList from './FriendList';
import AddComment from './AddComment';
import Comments from './Comments';
import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'

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

    const handleAddFriend = () => {
        dispatch(addFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(addLocalFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    const handleRemoveFriend = i => {
        const friendId = users.find(e => e._id === i);
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(e => e !== i);
        const friendFilteredFriends = friendId.friends.filter(e => e !== loggedInUser.id);
        dispatch(removeFriend({friendId, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    return (
        <>
            <Header />
            <Center py={6}>
                <Stack
                    borderWidth='1px'
                    borderRadius='lg'
                    w={{ sm: '100%', md: '540px' }}
                    minH={'50vh'}
                    height={{ sm: '476px', md: '20rem' }}
                    direction={{ base: 'column', md: 'row' }}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    padding={4}>
                    <Flex flex={1} bg='blue.200'>
                        <Image
                            objectFit='cover'
                            boxSize='100%'
                            src={currentProfile.profileImg}
                        />
                    </Flex>
                    <Stack
                        flex={1}
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={8}
                        p={1}
                        pt={2}>
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            {currentProfile.firstName}
                        </Heading>
                        <Text
                            fontWeight={600}
                            color={'gray.500'}
                            size='sm'
                            mb={4}>
                            {currentProfile.location}
                        </Text>
                        <Text
                            textAlign={'center'}
                            color={useColorModeValue('gray.700', 'gray.400')}
                            px={3}>
                            {currentProfile.bio}
                        </Text>
                        {!loggedInUserProfile ? (
                            <Stack
                                width={'100%'}
                                mt={'2rem'}
                                direction={'row'}
                                padding={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}>
                                <AddComment />
                                {!loggedInUser.friends.includes(
                                    currentProfile._id
                                ) ? (
                                    <Button
                                        onClick={() => handleAddFriend()}
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
                                        Add Friend
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() =>
                                                handleRemoveFriend(
                                                    currentProfile._id
                                                )
                                            }
                                            flex={1}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            bg={'green.400'}
                                            color={'white'}
                                            boxShadow={
                                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                            }
                                            _hover={{
                                                bg: 'green.500',
                                            }}
                                            _focus={{
                                                bg: 'green.500',
                                            }}>
                                            Friends
                                            <CheckIcon ml={2} />
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        ) : (
                            <EditProfile />
                        )}
                        <Stack
                            align={'left'}
                            justify={'left'}
                            // direction={'c'}
                            mt={6}>
                            {loggedInUser.instruments.map((instrument, i) => (
                                <Flex key={i}>
                                    <Badge
                                        px={2}
                                        py={1}
                                        bg={'gray.100'}
                                        // bg={useColorModeValue('gray.50', 'gray.800')}
                                        fontWeight={'600'}>
                                        {instrument.instrument}
                                    </Badge>
                                    <Badge
                                        px={2}
                                        py={1}
                                        bg={'gray.50'}
                                        // bg={useColorModeValue('gray.50', 'gray.800')}
                                        fontWeight={'400'}>
                                        {instrument.skill}
                                    </Badge>
                                </Flex>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Center>
            <FriendList />

            {id === loggedInUser.id ? (
                <>
                    <img src={`${loggedInUser.profileImg}`} alt='Profile' />
                    <h1>{loggedInUser.firstName}</h1>
                    <EditProfile />
                    <h2>Bio</h2>
                    <p>
                        {loggedInUser.bio
                            ? loggedInUser.bio
                            : "You haven't written a bio yet... write a little bit about yourself so others can get to know you!"}
                    </p>
                    <h2>Location</h2>
                    <p>{loggedInUser.location}</p>
                    <h1>Instruments</h1>
                    {loggedInUser.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)}
                            <Button onClick={() => handleDeleteInstrument(e)}>
                                X
                            </Button>
                        </p>
                    ))}
                    <AddInstrument />
                    <FriendList />
                    <h1>Comments</h1>
                    {loggedInUser.comments.map(c => (
                        <React.Fragment key={c.firstName}>
                            <p>{c.firstName}</p>
                            <p>
                                <img
                                    src={`${c.profileImg}`}
                                    width='100px'
                                    alt='profile of commment owner'
                                />
                                {c.comment}
                            </p>
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <>
                    {currentProfile && (
                        <>
                            <img
                                src={`${currentProfile.profileImg}`}
                                alt='Profile'
                            />
                            <h1>{currentProfile.firstName}</h1>
                            <h2>Bio</h2>
                            <p>
                                {currentProfile.bio
                                    ? currentProfile.bio
                                    : `${currentProfile.firstName} hasn't written a bio yet... guess you'll just have to ask!`}
                            </p>
                            <h2>Location</h2>
                            <p>{currentProfile.location}</p>
                            <h1>Instruments</h1>
                            {/* {currentProfile.instruments.length === 0
                                    ? `${currentProfile.firstName} still needs to add some instruments!`
                                    : currentProfile.instruments.map((e, i) => (
                                        <p key={i}>
                                            {e.instrument} - {e.skill}
                                        </p>
                                    ))} */}

                            {loggedInUser.friends.includes(
                                currentProfile._id
                            ) ? (
                                <>
                                    <h2>Friends &#10004;</h2>
                                    <Button
                                        onClick={() =>
                                            handleRemoveFriend(
                                                currentProfile._id
                                            )
                                        }>
                                        Remove Friend
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant='dark'
                                        onClick={() => handleAddFriend()}>
                                        Add Friend
                                    </Button>
                                </>
                            )}
                            <FriendList />
                            <h1>Comments</h1>
                            <AddComment />
                            <Comments />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;
