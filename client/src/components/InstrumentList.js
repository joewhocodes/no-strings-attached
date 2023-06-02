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
            <Stack
                align={'left'}
                justify={'left'}
                // direction={'c'}
                mt={6}>
                {currentProfile.instruments.map((instrument, i) => (
                    <Flex key={i}>
                        <Box
                            flex={1}
                            color={'secondary.500'}
                            minWidth={'60px'}
                            px={2}
                            py={1}
                            bg={'gray.100'}
                            fontWeight={'600'}>
                            {instrument.instrument}
                        </Box>
                        <Box
                            flex={1}
                            color={'primary.500'}
                            px={2}
                            py={1}
                            bg={'gray.50'}
                            fontWeight={'400'}>
                            {instrument.skill}
                            <Image src={require(`../images/instrument-icons/${instrument.instrument}.png`)}></Image>
                        </Box>
                        <Box 
                        justifyContent={'end'}>
                            {loggedInUserProfile && (
                                <Button onClick={() => handleRemoveInstrument(instrument)}>
                                    X
                                </Button>
                            )}
                        </Box>
                    </Flex>
                ))}
            </Stack>
        )
    );
}
 
export default InstrumentList;