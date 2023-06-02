import React from "react";
import { useDispatch } from 'react-redux';
import { removeInstrument } from './stateSlices/usersSlice';
import { useSelector } from 'react-redux';
// import 'client/public/instrument-icons';
import Guitar from '../images/instrument-icons/Guitar.png'
import {
    Box,
    Button,
    Flex,
    Image,
    Stack,
  } from '@chakra-ui/react'

const InstrumentList = () => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector((state) => state.users);
    const loggedInUserProfile = loggedInUser.id === currentProfile._id;
    const dispatch = useDispatch();
    
    const handleRemoveInstrument = instrument => {
        const filteredInstruments = currentProfile.instruments.filter(e => e !== instrument);
        dispatch(removeInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        console.log('instrument removed');
    };

    return (
        currentProfile.instruments && (
            <Flex
                align={'left'}
                justify={'left'}
                // direction={'c'}
                mt={6}>
                {currentProfile.instruments.map((instrument, i) => (
                    <Flex key={i}
                    direction={'column'}>
                        <Box
                            flex={1}
                            color={'secondary.500'}
                            minWidth={'60px'}
                            px={2}
                            py={1}
                            alignSelf={'center'}
                            // bg={'gray.100'}
                            fontWeight={'600'}>
                            {/* {instrument.instrument} */}
                        <Image
                            src={require(`../images/instrument-icons/${instrument.instrument}.png`)}
                            width={'50px'}
                            ></Image>
                        </Box>
                        <Box
                            flex={1}
                            textAlign={'center'}
                            borderRadius={10}
                            color={'primary.500'}
                            height={'60px'}
                            px={2}
                            py={1}
                            bg={instrument.skill === 'Beginner' ? 'green.500' : instrument.skill === 'Intermediate' ? 'yellow.500' : 'red.500'}
                            fontWeight={'400'}>
                            {/* {instrument.skill} */}
                        </Box>
                        
                        {/* <Box flex={1}> */}
                            {loggedInUserProfile && (
                                <Button variant={'delete'}
                                    onClick={() =>
                                        handleRemoveInstrument(instrument)
                                    }>
                                    X
                                </Button>
                            )}
                        {/* </Box> */}
                    </Flex>
                ))}
            </Flex>
        )
    );
}
 
export default InstrumentList;