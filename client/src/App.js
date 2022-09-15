import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        
    });

    const handleChange = e => {
        setForm({[e.target.name] : e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/signup', {
                userName: 'fred2',
                email: 'fred2@fred.com',
                password: 'something2',
                confirmPassword: 'something2',
            })
            .then(function (response) {
                console.log(response);
            })
            .then(navigate('/Profile'))
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <main className="container">
            <div className="row justify-content-center">
                <section className="col-6 mt-5">
                    <h1>LOG IN</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </section>
            </div>

            <div className="row justify-content-center">
                <section className="col-6 mt-5">
                <h1>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                User Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail2" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail2"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={handleChange}
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </section>
            </div>
            
        </main>

    );
};

export default App;
