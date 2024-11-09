import React from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export function Login() {
    const [cookies, setCookie] = useCookies(['userid']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        validate: values => {
            const errors = {};
            if (!values.UserId) {
                errors.UserId = 'UserId is required';
            }
            if (!values.Password) {
                errors.Password = 'Password is required';
            }
            return errors;
        },
        onSubmit: async (user) => {
            try {
                const response = await axios.post('http://localhost:4040/login-user', user);
                
                if (response.data.message === 'User login Successful') {
                    setCookie('userid', user.UserId, { path: '/' }); 
                    navigate('/user-dash');
                } else {
                    alert('Invalid User Id or Password');
                }
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed, please try again.");
            }
        }
    });

    return (
        <div className="m-4 p-2 bg-light w-25">
            <form onSubmit={formik.handleSubmit}>
                <h3>User Login</h3>
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
                </dl>
                <button type="submit" className="btn btn-dark w-100">Login</button>
            </form>
            <Link to="/signup">New User? Register</Link>
        </div>
    );
}
