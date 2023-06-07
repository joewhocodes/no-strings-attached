import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './stateSlices/signupSlice';
import { signinUser } from './stateSlices/signinSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cities } from '../data/cities';
import logo from '../images/logo-full.png';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Signup = () => {
    const { status, userRegistered, error } = useSelector(
        state => state.signup
    );
    const { loggedInUser } = useSelector(state => state.signin);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            location: '',
            password: '',
            image: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .matches(/^[a-zA-Z0-9']+$/, 'No special characters or spaces')
                .required('Please enter a first name'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Please enter your email address'),
            location: Yup.string().required('Please select a city'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Please enter a password'),
            image: Yup.mixed().test(
                'required',
                'Please upload a Profile Photo',
                value => value != null
            ),
        }),
        onSubmit: async values => {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            const signInData = {
                email: values.email,
                password: values.password,
            };
            console.log(formData);
            dispatch(signupUser(formData));
            setTimeout(() => {
                dispatch(signinUser(signInData));
            }, 5000);
        },
    });

    if (loggedInUser || userRegistered) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            direction={'column'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <img src={logo} width='400px' alt='Logo' />
                <Stack align={'center'}>
                    <Heading
                        color='secondary.500'
                        fontSize={'4xl'}
                        textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        and get jamming today ✌️
                    </Text>
                </Stack>
                <form
                    onSubmit={formik.handleSubmit}
                    encType='multipart/form-data'>
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
                        <Stack spacing={4}>
                            <FormLabel color='secondary.500'>
                                First Name
                            </FormLabel>
                            <Input
                                type='text'
                                {...formik.getFieldProps('firstName')}
                            />
                            <FormLabel color='secondary.500'>
                                Location
                            </FormLabel>
                            <select
                                className='form-control form-control-lg'
                                id='location'
                                name='location'
                                type='location'
                                {...formik.getFieldProps('location')}>
                                {cities.map(e => (
                                    <option>{e}</option>
                                ))}
                            </select>
                            {formik.touched.location &&
                            formik.errors.location ? (
                                <small className='form-text text-danger'>
                                    {formik.errors.location}
                                </small>
                            ) : null}
                            <FormLabel color='secondary.500'>Image</FormLabel>
                            <Input
                                className='form-control form-control-lg'
                                id='image'
                                name='image'
                                type='file'
                                accept='image/*'
                                onChange={e =>
                                    formik.setFieldValue(
                                        'image',
                                        e.currentTarget.files[0]
                                    )
                                }
                            />
                            {formik.touched.image && formik.errors.image ? (
                                <small className='form-text text-danger'>
                                    {formik.errors.image}
                                </small>
                            ) : null}
                            <FormControl id='email' isRequired>
                                <FormLabel color='secondary.500'>
                                    Email address
                                </FormLabel>
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
                            <FormControl>
                                <FormLabel color='secondary.500'>
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        {...formik.getFieldProps('password')}
                                    />

                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword(
                                                    showPassword =>
                                                        !showPassword
                                                )
                                            }>
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <small className='form-text text-danger'>
                                        {formik.errors.password}
                                    </small>
                                ) : null}
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                {status === 'loading' ? (
                                    <Button
                                        isLoading
                                        loadingText='Submitting'
                                        // colorScheme='teal'
                                        variant='outline'
                                    />
                                ) : (
                                    <Button
                                        type='submit'
                                        loadingText='Submitting'
                                        size='lg'
                                        bg={'secondary.500'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'secondary.300',
                                        }}>
                                        Sign up
                                    </Button>
                                )}{' '}
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?{' '}
                                    <NavLink to={'/signin'}>
                                        <Link
                                            color={'secondary.500'}
                                            _hover={{ color: 'secondary.300' }}>
                                            Login
                                        </Link>
                                    </NavLink>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    );
};

export default Signup;
