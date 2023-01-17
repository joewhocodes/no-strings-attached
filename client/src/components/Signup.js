import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './stateSlices/signupSlice';
import { signinUser } from './stateSlices/signinSlice';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const { status, userRegistered, error } = useSelector((state) => state.signup);
    const { loggedInUser } = useSelector((state) => state.signin);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            password: '',
            image: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Please enter your first name'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Please enter your email address'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Please enter your password'),
        }),
        onSubmit: async (values) => {
            // console.log(values)
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            const signInData = {email: values.email, password: values.password}
            dispatch(signupUser(formData));
            setTimeout(() => {
                dispatch(signinUser(signInData));
            }, 2000);
        },
    });
    
    if (loggedInUser || userRegistered) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    };

    return (
        <>
            {/* <form
                class="uploadForm"
                action="/api/signup"
                method="post"
                enctype="multipart/form-data"
            >
                <label class="control-label">Select File</label>
                <input name="image" id="image" type="file" class="file" />
                <label for="firstName">First name:</label>
                <input type="text" id="firstName" name="firstName" />
                <label for="email">email</label>
                <input type="text" id="email" name="email" />
                <label for="password">password</label>
                <input type="text" id="password" name="password" />
                <input type="submit" value="submit" />
            </form> */}
            {/* <form onSubmit={formik.handleSubmit}>
                <div>
                    <label> Name</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                </div>
                <div>
                    <label> Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div>
                    <label> Password</label>
                    <input
                        type="text"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div>
                    <label> Upload File</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) =>
                            formik.setFieldValue('image',e.currentTarget.files[0])
                        }
                    />
                </div>
                <button type="submit">Submit</button>
            </form> */}
            <h1>Welcome to No Strings Attached!</h1>
            <div className="register-form-container">
                <div className="col-10 col-sm-8 col-md-4 mx-auto">
                    <h1 className="font-weight-bold">Register</h1>
                </div>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="form-group col-10 col-sm-8 col-md-4 mx-auto mt-5">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <label htmlFor="firstName">First Name</label>
                        <input
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
                    <div className="form-group col-10 col-sm-8 col-md-4 mx-auto mt-3">
                        <label htmlFor="email">Email</label>
                        <input
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
                    <div className="form-group col-10 col-sm-8 col-md-4 mx-auto mt-3">
                        <label htmlFor='image'>Profile Image</label>
                        <input
                            className="form-control form-control-lg"
                            id='image'
                            name='image'
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                            formik.setFieldValue('image', e.currentTarget.files[0])
                                }
                        />
                    </div>
                    <div className="form-group col-10 col-sm-8 col-md-4 mx-auto mt-3">
                        <label htmlFor="password">Password</label>
                        <input
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
                    <div className="col-10 col-sm-8 col-md-4 mx-auto mt-3">
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block register-button"
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
                        </button>
                    </div>
                </form>
            </div>
            <h3>Already have an account?</h3>
            <NavLink to={'/Signin'}>Sign In Here</NavLink>
        </>
    );
};

export default Signup;
