import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signinUser } from './stateSlices/signinSlice';
import logo from '../images/logo-full.png';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';

const Signin = () => {
    const { status, loggedInUser, error } = useSelector(state => state.signin);

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
        onSubmit: async values => {
            dispatch(signinUser(values));
        },
    });

    useEffect(() => {
        if (loggedInUser) {
            navigate('/');
        }
    }, [loggedInUser, navigate]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}>
            <Stack spacing={10} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <img src={logo} alt='Logo' />
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={'secondary.500'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        And get on the jam ✌️
                    </Text>
                </Stack>
                <form onSubmit={formik.handleSubmit}>
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            {error}
                        </div>
                    )}
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={5}>
                            <FormControl id='email'>
                                <FormLabel color='secondary.500'>Email address</FormLabel>
                                <Input
                                    type='email'
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <small className='form-text text-danger'>
                                        {formik.errors.email}
                                    </small>
                                ) : null}
                            </FormControl>
                            <FormControl id='password'>
                                <FormLabel color='secondary.500'>Password</FormLabel>
                                <Input
                                    type='password'
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <small className='form-text text-danger'>
                                        {formik.errors.password}
                                    </small>
                                ) : null}
                            </FormControl>
                            {status === 'loading' ? (
                                <Button
                                    isLoading
                                    loadingText='Signing in'
                                    colorScheme='teal'
                                    variant='outline'
                                />
                            ) : (
                                <Button
                                    type='submit'
                                    bg={'secondary.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'secondary.300',
                                    }}>
                                    Sign in
                                </Button>
                            )}{' '}
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Not yet a user?{' '}
                                <NavLink to={'/'}>
                                    <Link color={'secondary.500'} _hover={{color: 'secondary.300'}}>Sign Up</Link>
                                </NavLink>
                            </Text>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    );
};

export default Signin;
