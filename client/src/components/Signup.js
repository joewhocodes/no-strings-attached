import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './stateSlices/signupSlice';
import { signinUser } from './stateSlices/signinSlice';
import { useFormik, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cities } from '../data/cities';
import logo from '../images/logo.png';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    validateName
} from '@chakra-ui/react';

const Signup = () => {
    const { status, userRegistered, error } = useSelector((state) => state.signup);
    const { loggedInUser } = useSelector((state) => state.signin);
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
                .matches(
                    /^[a-zA-Z0-9']+$/,
                    'No special characters or spaces'
                )
                .required('Please enter your first name'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Please enter your email address'),
            location: Yup.string()
                .required('Please select a city'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Please enter your password'),
            image: Yup.mixed()
                .test('required', "Please upload a Profile Photo", (value) => value != null)
            }),
        onSubmit: async (values) => {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            const signInData = {
                email: values.email,
                password: values.password,
            };
            dispatch(signupUser(formData));
            setTimeout(() => {
                dispatch(signinUser(signInData));
            }, 5000);
        },
    });
    
    // Keeps user logged in on local storage
    if (loggedInUser || userRegistered) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    };

    return (
        <>
            <img src={logo} width='400px' alt='Logo'/>
            <div>
                <div>
                    <h1>Register</h1>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            className="form-control form-control-lg"
                            id="firstName"
                            name="firstName"
                            type="text"
                            {...formik.getFieldProps('firstName')}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <small className="form-text text-danger">
                                {formik.errors.firstName}
                            </small>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input
                            className="form-control form-control-lg"
                            id="email"
                            name="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <small className="form-text text-danger">
                                {formik.errors.email}
                            </small>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <select
                            className="form-control form-control-lg"
                            id="location"
                            name="location"
                            type="location"
                            {...formik.getFieldProps('location')}
                        >
                            {cities.map((e) => (
                                <option>{e}</option>
                            ))}
                        </select>
                        {formik.touched.location && formik.errors.location ? (
                            <small className="form-text text-danger">
                                {formik.errors.location}
                            </small>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="image">Profile Image</label>
                        <Input
                            className="form-control form-control-lg"
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                formik.setFieldValue(
                                    'image',
                                    e.currentTarget.files[0]
                                )
                            }
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <small className="form-text text-danger">
                                {formik.errors.image}
                            </small>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input
                            className="form-control form-control-lg"
                            id="password"
                            name="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <small className="form-text text-danger">
                                {formik.errors.password}
                            </small>
                        ) : null}
                    </div>
                    <div>
                        <Button
                            type="submit"
                        >
                            {status === 'loading' ? (
                                <div
                                    className="spinner-border text-light"
                                    role="status"
                                    
                                >
                                    <span className="sr-only"></span>
                                </div>
                            ) : null}{' '}
                            Register
                        </Button>
                    </div>
                </form>
            </div>
            <h3>Already have an account?</h3>
            <NavLink to={'/Signin'}>Sign In Here</NavLink>


    <Formik
      initialValues={{ name: 'Sasuke' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name='name'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder='name' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>

        </>
    );
};

export default Signup;


