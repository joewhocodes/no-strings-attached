import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './stateSlices/usersSlice';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Header from './Header';
import AddRemoveFriend from './AddRemoveFriend';
import { cities } from '../data/cities';
import {
    Badge,
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

const UserList = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { users } = useSelector(state => state.users);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filters, setFilters] = useState({
        location: 'All',
        instrument: 'All',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            dispatch(fetchUsers({ token: loggedInUser.token }));
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        let filteredUsers = users;
        if (filters.location !== 'All') {
            filteredUsers = filteredUsers.filter(
                user => user.location === filters.location
            );
        }
        if (filters.instrument !== 'All') {
            filteredUsers = filteredUsers.filter(user =>
                user.instruments.find(
                    instrument => instrument.instrument === filters.instrument
                )
            );
        }
        setFilteredResults(filteredUsers);
    }, [filters, users]);

    const handleViewProfile = userId => {
        navigate(`/users/${userId}`);
    };

    return (
        <>
            <Header />
            <div>
                <h1>All users</h1>
                <h4>Filter By...</h4>
                <p>Location</p>
                <DropdownButton
                    variant='info'
                    title={filters.location}
                    id='dropdown-menu-align-right'
                    onSelect={e => setFilters({ ...filters, location: e })}>
                    <Dropdown.Item eventKey={'All'}>
                        <i>All</i>
                    </Dropdown.Item>
                    {cities.map(e => (
                        <Dropdown.Item eventKey={e} key={e}>
                            {e}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <p>Instrument</p>
                <DropdownButton
                    variant='info'
                    title={filters.instrument}
                    id='dropdown-menu-align-right'
                    onSelect={e => setFilters({ ...filters, instrument: e })}>
                    <Dropdown.Item eventKey={'All'}>
                        <i>All</i>
                    </Dropdown.Item>
                    {['Guitar', 'Bass', 'Vocals', 'Drums', 'Keyboard'].map(
                        e => (
                            <Dropdown.Item eventKey={e} key={e}>
                                {e}
                            </Dropdown.Item>
                        )
                    )}
                </DropdownButton>
                <Flex flexWrap={'wrap'} justifyContent={'center'}>
                    {filteredResults
                        .filter(e => e._id !== loggedInUser.id)
                        .map(user => (
                            <Center py={6} mt={'60px'}>
                                <Stack
                                    borderWidth='1px'
                                    borderRadius='lg'
                                    w={{ sm: '100%', md: '450px' }}
                                    height={{ sm: '476px', md: '20rem' }}
                                    direction={{ base: 'column', md: 'row' }}
                                    ml={'15px'}
                                    mr={'15px'}
                                    bg={'white'}
                                    boxShadow={'2xl'}
                                    padding={4}>
                                    <Flex flex={1} justifyContent={'center'}>
                                        <Image
                                            borderRadius='md'
                                            pt={{sm: '27px', md: '0px'}}
                                            mt={'0px'}
                                            w={{md: '211' }}
                                            height={{ md: '178' }}
                                            boxSize='250px'
                                            objectFit='cover'
                                            src={user.profileImg}
                                        />
                                    </Flex>
                                    <Stack
                                        flex={1}
                                        flexDirection='column'
                                        justifyContent='center'
                                        alignItems='center'
                                        p={1}
                                        pt={2}>
                                        <Heading
                                            fontSize={'2xl'}
                                            fontFamily={'body'}>
                                            {user.firstName}
                                        </Heading>
                                        <Text
                                            as='i'
                                            fontWeight={600}
                                            color={'gray.500'}
                                            size='sm'
                                            mb={6}>
                                            {user.location}
                                        </Text>
                                        <Text
                                            textAlign={'center'}
                                            color={'gray.700'}
                                            minH={'50px'}
                                            pt={1}
                                            px={3}>
                                            {user.bio}
                                        </Text>
                                        <Stack
                                            align={'center'}
                                            justify={'center'}
                                            direction={'row'}
                                            mt={6}>
                                            <Badge
                                                px={2}
                                                py={1}
                                                bg={'gray.50'}
                                                fontWeight={'400'}>
                                                #art
                                            </Badge>
                                            <Badge
                                                px={2}
                                                py={1}
                                                bg={'gray.50'}
                                                fontWeight={'400'}>
                                                #photography
                                            </Badge>
                                            <Badge
                                                px={2}
                                                py={1}
                                                bg={'gray.50'}
                                                fontWeight={'400'}>
                                                #music
                                            </Badge>
                                        </Stack>

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
                                                }}
                                                onClick={() => handleViewProfile(user._id)}
                                                >
                                                    View Profile
                                            </Button>
                                            <AddRemoveFriend user={user} />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Center>
                        ))}
                </Flex>
            </div>
        </>
    );
};

export default UserList;
