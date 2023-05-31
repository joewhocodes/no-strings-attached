import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setCurrentProfile, deleteInstrument } from './stateSlices/usersSlice';
import { deleteLocalInstrument } from './stateSlices/signinSlice';
import UpdateProfile from './UpdateProfile';
import AddComment from './AddComment';
import AddInstrument from './AddInstrument';
import AddFriend from './AddFriend';
import {
    Badge,
    Box,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
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
        <Flex py={6}>
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
                <Flex flex={1}>
                    <Image
                        borderRadius='md'
                        boxSize='250px'
                        // size={'xl'}
                        objectFit='cover'
                        // boxSize='100%'
                        src={currentProfile.profileImg}
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection='column'
                    justifyContent='Box'
                    alignItems='center'
                    spacing={8}
                    p={1}
                    pt={2}>
                    <Heading
                        fontSize={'2xl'}
                        fontFamily={'body'}
                        color={'backing.500'}>
                        {currentProfile.firstName}
                    </Heading>
                    <Text fontWeight={600} color={'black'} size='sm' mb={4}>
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
                            <AddFriend user={currentProfile}/>
                        </Stack>
                    ) : (
                        <Stack
                            width={'100%'}
                            mt={'2rem'}
                            direction={'row'}
                            padding={2}
                            justifyContent={'space-between'}
                            alignItems={'center'}>
                            <UpdateProfile />
                            <AddInstrument />
                        </Stack>
                    )}
                    <Stack
                        align={'left'}
                        justify={'left'}
                        // direction={'c'}
                        mt={6}>
                        {loggedInUser.instruments.map((instrument, i) => (
                            <Flex key={i}>
                                <Badge
                                    color={'secondary.500'}
                                    px={2}
                                    py={1}
                                    bg={'gray.100'}
                                    fontWeight={'600'}>
                                    {instrument.instrument}
                                </Badge>
                                <Badge
                                    color={'primary.500'}
                                    px={2}
                                    py={1}
                                    bg={'gray.50'}
                                    fontWeight={'400'}>
                                    {instrument.skill}
                                </Badge>
                            </Flex>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default Profile;
