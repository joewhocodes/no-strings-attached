import React from "react";
import { useDispatch } from 'react-redux';
import { removeInstrument } from './stateSlices/usersSlice';
import { useSelector } from 'react-redux';
import {
    Badge,
    Button,
    Flex,
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
                        {loggedInUserProfile && (
                            <Button onClick={() => handleRemoveInstrument(instrument)}>
                                X
                            </Button>
                        )}
                    </Flex>
                ))}
            </Stack>
        )
    );
}
 
export default InstrumentList;