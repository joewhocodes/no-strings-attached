import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './stateSlices/signinSlice';
import logoNavbar from '../images/logo-navbar.png';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutSubmitHandler = () => {
        dispatch(logout());
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    return (
        <Box
            position={'fixed'}
            zIndex={100}
            top={0}
            left={0}
            right={0}
            bg={useColorModeValue('white', 'gray.900')}
            px={4}
            mb={'300px'}>
            <Flex
                h='65px'
                alignItems={'center'}
                justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <NavLink to='/'>
                        <img src={logoNavbar} width='200px' alt='Logo' />
                    </NavLink>
                    <HStack
                        as={'nav'}
                        spacing={10}
                        display={{ base: 'none', md: 'flex' }}>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to={`/users/${loggedInUser.id}`}>
                            Profile
                        </NavLink>
                        <NavLink to='/UserList'>All Users</NavLink>
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar size={'md'} src={loggedInUser.profileImg} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={logoutSubmitHandler}>
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to={`/users/${loggedInUser.id}`}>
                            Profile
                        </NavLink>
                        <NavLink to='/UserList'>All Users</NavLink>
                    </Stack>
                </Box>
            ) : null}
        </Box>

        // <nav>
        //     <ul>
        //         <li>
        //             <NavLink to="/">Home</NavLink>
        //             <NavLink to={`/users/${loggedInUser.id}`}>
        //                 Profile
        //             </NavLink>
        //             <NavLink to="/FriendPage">Friends</NavLink>
        //             <NavLink to="/UserList">All Users</NavLink>
        //         </li>
        //         <li>
        //             {loggedInUser && (
        //                 <button
        //                     onClick={logoutSubmitHandler}
        //                     className="btn btn-lg btn-primary btn-block"
        //                 >
        //                     Sign out
        //                 </button>
        //             )}
        //         </li>
        //     </ul>
        // </nav>
    );
};

export default Header;
