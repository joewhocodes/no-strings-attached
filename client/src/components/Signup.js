import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './stateSlices/signupSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, userRegistered, error } = useSelector(
        (state) => state.signup
    );

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            password: '',
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
        onSubmit: (values) => {
            dispatch(signupUser(values));
        },
    });
    
    if (userRegistered) {
        navigate('/signin');
    }
    return (
        <div className="register-form-container">
            <div className="col-10 col-sm-8 col-md-4 mx-auto">
                <h1 className="font-weight-bold">Register</h1>
            </div>
            <form onSubmit={formik.handleSubmit}>
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
    );
};
export default Signup;
