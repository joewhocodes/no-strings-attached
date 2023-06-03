import React from 'react';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';
import AddComment from './AddComment';
import AddInstrument from './AddInstrument';
import AddFriend from './AddRemoveFriend';
import {
    Box,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import InstrumentList from './InstrumentList';

const ProfileCard = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector(state => state.users);

    const loggedInUserProfile = loggedInUser.id === currentProfile._id;

    return (
        <Flex
            mt={'75px'}
            mr={'15px'}
            mb={'22px'}
            ml={'15px'}
            bg={'white'}
            alignItems={'center'}
            borderWidth={'1px'}
            boxShadow={'2xl'}
            borderRadius={'lg'}>
            <Stack
                display={'flex'}
                w={{ sm: '100%', lg: '540px' }}
                direction={'column'}
                padding={4}>
                <Box>
                    <Heading
                        fontSize={'26px'}
                        fontFamily={'body'}
                        textAlign={'center'}
                        color={'backing.500'}>
                        {currentProfile.firstName}
                    </Heading>
                    <Center ml={'auto'} mr={'auto'}>
                        <Image
                            borderRadius='md'
                            mt={4}
                            boxSize='250px'
                            objectFit='cover'
                            src={currentProfile.profileImg}
                        />
                    </Center>
                    <Stack
                        flex={1}
                        flexDirection='column'
                        justifyContent='Box'
                        alignItems='center'
                        spacing={8}
                        p={1}
                        pt={2}>
                        <Text
                            fontWeight={600}
                            as={'i'}
                            color={'black'}
                            size='sm'
                            mt={5}
                            >
                            {currentProfile.location}
                        </Text>
                        <Text
                            textAlign={'center'}
                            color={useColorModeValue('gray.700', 'gray.400')}
                            >
                            "{currentProfile.bio}"
                        </Text>
                        {!loggedInUserProfile ? (
                            <Stack
                                width={'100%'}
                                mt={'2rem'}
                                // pt={5}
                                direction={'row'}
                                padding={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}>
                                <AddComment />
                                <AddFriend user={currentProfile} />
                            </Stack>
                        ) : (
                            <Stack
                                width={'100%'}
                                mt={'2rem'}
                                // pt={5}
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
                </Box>
            </Stack>
        </Flex>
    );
};

export default ProfileCard;
