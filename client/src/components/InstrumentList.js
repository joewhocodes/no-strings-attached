import React from 'react';
import { useDispatch } from 'react-redux';
import { removeInstrument } from './stateSlices/usersSlice';
import { useSelector } from 'react-redux';
import { Box, Button, Flex, Image } from '@chakra-ui/react';

const InstrumentList = props => {
    const { loggedInUser } = useSelector(state => state.signin);
    const { currentProfile } = useSelector(state => state.users);
    const loggedInUserProfile = loggedInUser.id === currentProfile._id;
    const dispatch = useDispatch();

    const handleRemoveInstrument = instrument => {
        const filteredInstruments = currentProfile.instruments.filter(
            e => e !== instrument
        );
        dispatch(
            removeInstrument({
                instruments: filteredInstruments,
                id: loggedInUser.id,
            })
        );
        console.log('instrument removed');
    };
    console.log(props.user);

    return (
        <Box minH={'105px'}>
            {props.user.instruments && (
                <Flex align={'left'} justify={'left'} mt={6}>
                    {props.user.instruments.map((instrument, i) => (
                        <Flex key={i} direction={'column'}>
                            <Box
                                flex={1}
                                color={'secondary.500'}
                                minWidth={'60px'}
                                px={2}
                                py={1}
                                alignSelf={'center'}
                                fontWeight={'600'}>
                                <Image
                                    src={require(`../images/instrument-icons/${instrument.instrument}.png`)}
                                    width={'50px'}></Image>
                            </Box>
                            <Box
                                flex={1}
                                textAlign={'center'}
                                borderRadius={10}
                                color={'primary.500'}
                                px={2}
                                py={1}
                                bg={
                                    instrument.skillLevel === 'Beginner'
                                        ? 'green.500'
                                        : instrument.skillLevel ===
                                          'Intermediate'
                                        ? 'yellow.500'
                                        : 'red.500'
                                }
                                fontWeight={'400'}></Box>
                            {loggedInUserProfile && (
                                <Button
                                    variant={'delete'}
                                    onClick={() =>
                                        handleRemoveInstrument(instrument)
                                    }>
                                    X
                                </Button>
                            )}
                        </Flex>
                    ))}
                </Flex>
            )}
        </Box>
    );
};

export default InstrumentList;
