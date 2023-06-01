import React from "react";
import { useSelector } from 'react-redux';
import {
    Badge,
    Flex,
    Stack,
  } from '@chakra-ui/react'

const InstrumentList = () => {
    const { currentProfile } = useSelector((state) => state.users);
    
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
                    </Flex>
                ))}
            </Stack>
        )
    );
}
 
export default InstrumentList;