import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signinUser } from './stateSlices/signinSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Signin = () => {
    const { status, loggedInUser, error } = useSelector(
        (state) => state.signin
    );

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

    if (loggedInUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        navigate('/');
    }

    return (
        <>
            <h1>Welcome to No Strings Attached!</h1>
            <div className="login-form-container">
                <div className="col-10 col-sm-8 col-md-4 mx-auto">
                    <h1 className="font-weight-bold">Login</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group col-10 col-sm-8 col-md-4 mx-auto mt-5">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
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
                            className="btn btn-lg btn-primary btn-block"
                        >
                            {status === 'loading' ? (
                                <div
                                    className="spinner-border text-light"
                                    role="status"
                                >
                                    <span className="sr-only"></span>
                                </div>
                            ) : null}{' '}
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <h3>Don't have an account yet?</h3>
            <NavLink to={'/'}>
                Sign Up Here
            </NavLink>
        </>
    );
};

export default Signin;
