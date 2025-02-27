import { NavLink } from 'react-router-dom';
import './Login.css';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

    const [logidata, setlogindata] = useState({
        email: "",
        password: "",
    })


    const handleChange = (e) => {
        setlogindata({ ...logidata, [e.target.name]: e.target.value })
    }

    const isValidEmail = (email) => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    console.log(logidata);

    const handlelogin =  (e) => {
        e.preventDefault();
        if(logidata.email == "" || logidata.password == ""){
            console.log("Error");
            toast.error("Fill all details");
            return;
        }

        const emailIsValid = isValidEmail(logidata.email);

        if(!emailIsValid){
            toast.error("Invalid email format");
            return;
        }

        console.log(` Final Data ${logidata.email} , ${logidata.password}`);    
    }


    return (
        <div className="login-container">
            <div className="login-left">
                <img
                    src="/Images/loginimg.png"
                    alt="Agriculture App Illustration"
                    className="login-image"
                />
            </div>
            <div className="login-right">
                <div className="login-header">
                    <img src="/Images/logo2.png" alt="Logo" className="login-logo" />
                    <h2>Welcome Back!!</h2>
                </div>
                <form className="login-form">
                    <div className="Input-field">
                        <label>Email Id</label>
                        <input type="email" placeholder="Enter your email" value={logidata.email} name='email' onChange={handleChange} />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={logidata.password} name='password' onChange={handleChange} />
                        <p className='Signup'  >  Don&apos;t Have Account -- <NavLink to="/signup"    > SignUp </NavLink>  </p>
                    </div>

                    <button type="submit" className="login-button" onClick={handlelogin} >
                        Login In
                    </button>
                    <ToastContainer />
                    <button type="button" className="google-button"    >
                        <span role="img" aria-label="google-icon"> <FcGoogle /></span> Log in with Google
                    </button>
                </form>
            </div>
        </div>
        
    );
}

export default Login;