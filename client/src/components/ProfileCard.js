import React from 'react';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';
import AddComment from './AddComment';
import AddInstrument from './AddInstrument';
import AddFriend from './AddRemoveFriend';
import {
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import InstrumentList from './InstrumentList';

const ProfileCard = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { currentProfile } = useSelector((state) => state.users);

    const loggedInUserProfile = loggedInUser.id === currentProfile._id;

    return (
        <Flex py={6}>
            <Stack
                borderWidth='1px'
                borderRadius='lg'
                w={{ sm: '100%', md: '540px' }}
                minH={'50vh'}
                // height={{ sm: '476px', md: '20rem' }}
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
                    <Text fontWeight={600} as={'i'} color={'black'} size='sm' mb={4}>
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
                    <InstrumentList />
                </Stack>
            </Stack>
        </Flex>
    );
};

export default ProfileCard;
