import { NavLink } from 'react-router-dom';
import './SingnUp.css';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const SignUp = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        mobno:"",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isValidMobile = (mobile) => {
        const mobileStr = String(mobile).trim()
        const mobileRegex = /^[6-9][0-9]{9}$/;
        return mobileRegex.test(mobileStr);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (signupData.name === "" || signupData.email === "" || signupData.mobno === "" || signupData.password === "" || signupData.confirmPassword === "") {
            toast.error("Fill all details");
            return;
        }
    
        if (!isValidEmail(signupData.email)) {
            toast.error("Invalid email format");
            return;
        }

        if (!isValidMobile(signupData.mobno)) {
            toast.error("Invalid mobile number");
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/signup", signupData);
            toast.success(response.data.message);
            console.log("Signup Success:", response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            console.error("Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="signup-container">
            <div className="signup-left">
                <img
                    src="/Images/loginimg.png"
                    alt="Agriculture App Illustration"
                    className="signup-image"
                />
            </div>
            <div className="signup-right">
                <div className="signup-header">
                    <img src="/Images/logo2.png" alt="Logo" className="signup-logo" />
                    <h2>Create an Account</h2>
                </div>
                <form className="signup-form">
                    <div className="input-field">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your name" value={signupData.name} name='name' onChange={handleChange} />
                        <label>Email Id</label>
                        <input type="email" placeholder="Enter your email" value={signupData.email} name='email' onChange={handleChange} />
                        <label>Mobile No</label>
                        <input type="tel" placeholder="Enter your Mobile No" value={signupData.mobno} name='mobno' onChange={handleChange} />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={signupData.password} name='password' onChange={handleChange} />
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" value={signupData.confirmPassword} name='confirmPassword' onChange={handleChange} />
                        <p className='login-link'>Already have an account? <NavLink to="/login">Login</NavLink></p>
                    </div>

                    <button type="submit" className="rigister-button" onClick={handleSignUp}>
                        Sign Up
                    </button>
                    <ToastContainer />
                    <button type="button" className="google-button">
                        <span role="img" aria-label="google-icon"><FcGoogle /></span> Sign up with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
