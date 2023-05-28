import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFriend, fetchUsers, removeFriend } from './stateSlices/usersSlice';
import { addLocalFriend, deleteLocalInstrument, removeLocalFriend } from './stateSlices/signinSlice';
import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const AddFriend = props => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { users } = useSelector((state) => state.users);
    const { currentProfile } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleAddFriend = () => {
        dispatch(addFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(addLocalFriend({friendId: id, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
        console.log(`user is ${props}`)
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
            {!loggedInUser.friends.includes(currentProfile._id) ? (
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
                        onClick={() => handleRemoveFriend(currentProfile._id)}
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
        </>
    );
};

export default AddFriend;
