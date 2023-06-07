import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, fetchUsers, removeFriend } from './stateSlices/usersSlice';
import { addLocalFriend, removeLocalFriend } from './stateSlices/signinSlice';
import { Button } from '@chakra-ui/react';

const AddFriend = props => {
    const { loggedInUser } = useSelector(state => state.signin);
    const dispatch = useDispatch();
    let isFriend = loggedInUser.friends.includes(props.user._id);

    const handleAddFriend = () => {
        dispatch(
            addFriend({
                friendId: props.user._id,
                loggedInUserId: loggedInUser.id,
            })
        );
        dispatch(
            addLocalFriend({
                friendId: props.user._id,
                loggedInUserId: loggedInUser.id,
            })
        );
        dispatch(
            fetchUsers({ token: loggedInUser.token, changingPage: false })
        );
    };

    const handleRemoveFriend = () => {
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(
            friend => friend !== props.user._id
        );
        const friendFilteredFriends = props.user.friends.filter(
            friend => friend !== loggedInUser.id
        );
        dispatch(
            removeFriend({
                friendId: props.user._id,
                loggedInUserFilteredFriends,
                friendFilteredFriends,
                loggedInUserId: loggedInUser.id,
            })
        );
        dispatch(
            removeLocalFriend({
                loggedInUserFilteredFriends,
                friendFilteredFriends,
                loggedInUserId: loggedInUser.id,
            })
        );
        dispatch(
            fetchUsers({ token: loggedInUser.token, changingPage: false })
        );
    };

    useEffect(() => {
        isFriend = loggedInUser.friends.includes(props.user._id);
    }, [handleAddFriend, handleRemoveFriend]);

    return (
        <>
            {props && loggedInUser.id !== props.user._id && (
                <Button
                    variant={'secondary'}
                    onClick={() =>
                        !isFriend ? handleAddFriend() : handleRemoveFriend()
                    }
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    bg={!isFriend ? 'primary.500' : 'green.400'}
                    _hover={
                        !isFriend ? { bg: 'primary.400' } : { bg: 'red.500' }
                    }
                    _focus={
                        !isFriend ? { bg: 'primary.400' } : { bg: 'green.300' }
                    }>
                    {!isFriend ? 'Add Friend' : 'Friends'}
                </Button>
            )}
        </>
    );
};

export default AddFriend;
