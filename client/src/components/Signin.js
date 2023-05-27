import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, Form } from 'formik';
import * as Yup from 'yup';
import { signinUser } from './stateSlices/signinSlice';
import logo from '../images/logo.png';
import {
    FormErrorMessage,
    FormHelperText,
    Box,
    VStack,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Checkbox,
    StackDivider
  } from '@chakra-ui/react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Signin = () => {
    const { status, loggedInUser, error } = useSelector((state) => state.signin);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Please enter your email address'),
            password: Yup.string().required('Please enter your password'),
        }),
        onSubmit: async (values) => {
            dispatch(signinUser(values));
            console.log(values)
        },
    });

    useEffect(() => {
        if (loggedInUser) {
            navigate('/');
        }
    }, [loggedInUser, navigate]);

    return (
            <Flex
                minH={'85vh'}
                align={'center'}
                justify={'center'}
                direction={'column'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <img src={logo} alt='Logo' />
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>
                            Sign in to your account
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            And get on the jam ✌️
                        </Text>
                    </Stack>
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={4}>
                                <FormControl id='email'>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type='email' 
                                        {...formik.getFieldProps('email')}
                                    />
                                </FormControl>
                                <FormControl id='password'>
                                    <FormLabel>Password</FormLabel>
                                    <Input type='password' 
                                        {...formik.getFieldProps('password')}
                                    />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}></Stack>
                                    <Button
                                        type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Sign in
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </form>
                </Stack>
            </Flex>
            /* <Box>
                <img src={logo} width='400px' alt='Logo' />
                <Heading>Login</Heading>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        {error && (
                            <div className='alert alert-danger' role='alert'>
                                {error}
                            </div>
                        )}
                        <label htmlFor='email'>Email</label>
                        <input
                            className='form-control form-control-lg'
                            id='email'
                            name='email'
                            type='email'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <small className='form-text text-danger'>
                                {formik.errors.email}
                            </small>
                        ) : null}
                    </div>
                    <div className=''>
                        <label htmlFor='password'>Password</label>
                        <input
                            className='form-control form-control-lg'
                            id='password'
                            name='password'
                            type='password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <small className='form-text text-danger'>
                                {formik.errors.password}
                            </small>
                        ) : null}
                    </div>
                    <Button type='submit' size='lg' mt='5' colorScheme='teal'>
                        {status === 'loading' ? (
                            <div
                                className='spinner-border text-light'
                                role='status'>
                                <span className='sr-only'></span>
                            </div>
                        ) : null}{' '}
                        Let's Go!
                    </Button>
                </form>
                <Box mx='auto'>
                    <Heading mt='5'>Don't have an account yet?</Heading>
                    <Button colorScheme='teal'>
                        <NavLink to={'/'}>Sign Up Here</NavLink>
                    </Button>
                </Box>
            </Box> */
    );
};

export default Signin;
