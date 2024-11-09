import React from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Signup() 
{

    const [userIdAvailable, setUserIdAvailable] = useState(null);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Email: '',
            Password: '',
            Mobile: ''
        },
        validate: values => {
            const errors = {};
            if (!values.UserId) {
                errors.UserId = 'UserId is required';
            }
            if (!values.UserName) {
                errors.UserName = 'UserName is required';
            }
            if (!values.Email) {
                errors.Email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
                errors.Email = 'Email is invalid';
            }
            if (!values.Password) {
                errors.Password = 'Password is required';
            } else if (values.Password.length < 6) {
                errors.Password = 'Password must be at least 6 characters';
            }
            if (!values.Mobile) {
                errors.Mobile = 'Mobile is required';
            } else if (!/^\d{10}$/.test(values.Mobile)) {
                errors.Mobile = 'Mobile number must be 10 digits';
            }
            return errors;
        },
        onSubmit: (user) => {
            axios.post('http://localhost:4040/register-user', user)
                .then(() => {
                    alert('Registered Successfully..');
                    navigate('/login');
                })
                .catch(error => {
                    console.error("Registration failed:", error);
                    alert('Registration failed, please try again.');
                });
        }
    });

    const checkUserId = async (userId) =>{

        if (userId.length >= 3) { 
            try {
                const response = await axios.post('http://localhost:4040/check-userid', { UserId: userId });
                if (response.data.exists) {
                    setUserIdAvailable(false);  
                } else {
                    setUserIdAvailable(true); 
                }
            } catch (error) {
                console.error("Error checking UserId availability:", error);
                setUserIdAvailable(null);
            }
        }
    };  

    useEffect(() => {
        if (formik.values.UserId) {

            checkUserId(formik.values.UserId);
        }
    }, [formik.values.UserId]);






    return (
        <div className="m-4 p-4 bg-light w-25">
            <form onSubmit={formik.handleSubmit}>
                <h3>Register User</h3>

                <dl>
                    <dt>UserId</dt>
                    <dd>
                        <input
                            type="text"
                            name="UserId"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.UserId}
                        />
                        {formik.errors.UserId && formik.touched.UserId && (
                            <div style={{ color: 'red' }}>{formik.errors.UserId}</div>
                        )}
                        {userIdAvailable === false && (
                            <div style={{ color: 'red' }}>UserId is already taken</div>
                        )}
                        {userIdAvailable === true && (
                            <div style={{ color: 'green' }}>UserId is available</div>
                        )}
                    </dd>

                    <dt>User Name</dt>
                    <dd>
                        <input
                            type="text"
                            name="UserName"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.UserName}
                        />
                        {formik.errors.UserName && formik.touched.UserName && (
                            <div style={{ color: 'red' }}>{formik.errors.UserName}</div>
                        )}
                    </dd>

                    <dt>Email</dt>
                    <dd>
                        <input
                            type="email"
                            name="Email"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.Email}
                        />
                        {formik.errors.Email && formik.touched.Email && (
                            <div style={{ color: 'red' }}>{formik.errors.Email}</div>
                        )}
                    </dd>

                    <dt>Password</dt>
                    <dd>
                        <input
                            type="password"
                            name="Password"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.Password}
                        />
                        {formik.errors.Password && formik.touched.Password && (
                            <div style={{ color: 'red' }}>{formik.errors.Password}</div>
                        )}
                    </dd>

                    <dt>Mobile</dt>
                    <dd>
                        <input
                            type="text"
                            name="Mobile"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.Mobile}
                        />
                        {formik.errors.Mobile && formik.touched.Mobile && (
                            <div style={{ color: 'red' }}>{formik.errors.Mobile}</div>
                        )}
                    </dd>
                </dl>

                <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={userIdAvailable === false}
                >
                    Register
                </button>
            </form>

            <Link to="/login">Existing User?</Link>
        </div>
    );
        
}
