import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFriend, fetchUsers, removeFriend } from './stateSlices/usersSlice';
import { addLocalFriend, removeLocalFriend } from './stateSlices/signinSlice';
import { Button } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const AddFriend = props => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();
    let isFriend = loggedInUser.friends.includes(currentProfile._id);

    const handleAddFriend = () => {
        dispatch(addFriend({friendId: props.user._id, loggedInUserId: loggedInUser.id}));
        dispatch(addLocalFriend({friendId: props.user._id, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };
    
    const handleRemoveFriend = () => {
        const loggedInUserFilteredFriends = loggedInUser.friends.filter(friend => friend !== props.user._id);
        const friendFilteredFriends = props.user.friends.filter(friend => friend !== loggedInUser.id);
        console.log(loggedInUserFilteredFriends.includes(props.user._id))
        dispatch(removeFriend({friendId: props.user._id, loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(removeLocalFriend({loggedInUserFilteredFriends, friendFilteredFriends, loggedInUserId: loggedInUser.id}));
        dispatch(fetchUsers({ token: loggedInUser.token }));
    };

    useEffect(() => {
        isFriend = loggedInUser.friends.includes(currentProfile._id);
        console.log(`isFriend: `, isFriend)
    }, [handleAddFriend, handleRemoveFriend]);
    
    
    return (
        <>
            {props && (
                <Button
                    onClick={() => !isFriend ? handleAddFriend() : handleRemoveFriend()}
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={!isFriend ? {bg: 'blue.500'} : {bg: 'green.500'}}
                    _focus={!isFriend ? {bg: 'blue.500'} : {bg: 'green.500'}}>
                    {!isFriend ? 'Add Friend' : <CheckIcon ml={2} />} 
                </Button>
            )}
        </>
    );
};

export default AddFriend;
