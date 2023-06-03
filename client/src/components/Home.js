import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';

const Home = () => {
    const { loggedInUser } = useSelector(state => state.signin);

    return (
        <>
            <Header />
            <Container maxW={'5xl'} py={12} mt={'100px'} position={'relative'}>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={10}
                    textAlign={'center'}
                    mt={{ base: '0', md: '5vh' }}>
                    <Stack
                        borderWidth='1px'
                        borderRadius='lg'
                        spacing={4}
                        bg={'white'}
                        pt={'50px'}
                        boxShadow={'lg'}
                        pb={'50px'}
                        justifyContent={'center'}>
                        <Heading fontSize={'40px'}>
                            Hey {loggedInUser.firstName}!
                        </Heading>
                        <Text color={'gray.500'} fontSize={'15px'} pb={'10px'}>
                            Let's get jamming ✌️
                        </Text>
                        <Text
                            textTransform={'uppercase'}
                            color={'white'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={'backing.500'}
                            p={2}
                            alignSelf={'center'}
                            rounded={'md'}>
                            Your total friends: {loggedInUser.friends.length}
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue(
                                        'gray.100',
                                        'gray.700'
                                    )}
                                />
                            }></Stack>
                    </Stack>
                    <Flex
                        justifyContent={'center'}
                        borderWidth='1px'
                        borderRadius='lg'
                        spacing={4}
                        bg={'white'}
                        pt={'50px'}
                        boxShadow={'lg'}>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={`${loggedInUser.profileImg}`}
                            objectFit={'cover'}
                            w={'500px'}
                            h={'500px'}
                        />
                    </Flex>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default Home;
