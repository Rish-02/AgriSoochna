// import { NavLink } from 'react-router-dom';
// import './Login.css';
// import { FcGoogle } from "react-icons/fc";
// import { useState } from 'react';

// import {ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const Login = () => {

//     const [logidata, setlogindata] = useState({
//         email: "",
//         password: "",
//     })


//     const handleChange = (e) => {
//         setlogindata({ ...logidata, [e.target.name]: e.target.value })
//     }

//     const isValidEmail = (email) => {

//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailRegex.test(email);
//     }

//     console.log(logidata);

//     const handlelogin =  (e) => {
//         e.preventDefault();
//         if(logidata.email == "" || logidata.password == ""){
//             console.log("Error");
//             toast.error("Fill all details");
//             return;
//         }

//         const emailIsValid = isValidEmail(logidata.email);

//         if(!emailIsValid){
//             toast.error("Invalid email format");
//             return;
//         }
//         console.log(emailIsValid);

//         console.log(` Final Data ${logidata.email} , ${logidata.password}`);    
//     }


//     return (
//         <div className="login-container">
//             <div className="login-left">
//                 <img
//                     src="/Images/loginimg.png"
//                     alt="Agriculture App Illustration"
//                     className="login-image"
//                 />
//             </div>
//             <div className="login-right">
//                 <div className="login-header">
//                     <img src="/Images/logo2.png" alt="Logo" className="login-logo" />
//                     <h2>Welcome Back!!</h2>
//                 </div>
//                 <form className="login-form">
//                     <div className="Input-field">
//                         <label>Email Id</label>
//                         <input type="email" placeholder="Enter your email" value={logidata.email} name='email' onChange={handleChange} />
//                         <label>Password</label>
//                         <input type="password" placeholder="Enter your password" value={logidata.password} name='password' onChange={handleChange} />
//                         <p className='Signup'  >  Don&apos;t Have Account -- <NavLink to="/signup"    > SignUp </NavLink>  </p>
//                     </div>

//                     <button type="submit" className="login-button" onClick={handlelogin} >
//                         Login In
//                     </button>
//                     <ToastContainer />
//                     <button type="button" className="google-button"    >
//                         <span role="img" aria-label="google-icon"> <FcGoogle /></span> Log in with Google
//                     </button>
//                 </form>
//             </div>
//         </div>
        
//     );
// }

// export default Login;
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Login.css';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [logindata, setLoginData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Validate email format
    const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

    // Handle login API call
    const handleLogin = async (e) => {
        e.preventDefault();

        if (logindata.email.trim() === "" || logindata.password.trim() === "") {
            toast.error("Fill in all details");
            return;
        }

        if (!isValidEmail(logindata.email.trim())) {
            toast.error("Invalid email format");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/login", logindata);
            toast.success(response.data.message);
            console.log("Login Success:", response.data);
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src="/Images/loginimg.png" alt="Agriculture App Illustration" className="login-image" />
            </div>
            <div className="login-right">
                <div className="login-header">
                    <img src="/Images/logo2.png" alt="Logo" className="login-logo" />
                    <h2>Welcome Back!!</h2>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-field">
                        <label>Email Id</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={logindata.email} 
                            name="email" 
                            onChange={handleChange} 
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={logindata.password} 
                            name="password" 
                            onChange={handleChange} 
                        />
                        <p className='signup'>Don&apos;t Have an Account? <NavLink to="/signup">Sign Up</NavLink></p>
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                    <ToastContainer />
                    <button type="button" className="google-button">
                        <FcGoogle /> Log in with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
