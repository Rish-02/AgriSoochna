import User from "../models/user.js";
import { hash, compare } from "bcrypt";
// const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import bcrypt from 'bcrypt';

// export async function signup(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "email and password are required." });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     const hashedPassword = await hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user." });
//   }
// }
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const user = require("../models/user"); // Ensure correct path
// require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();
export async function signup(req, res) {
  try {
    const { name, email, password, mobno,confirmPassword } = req.body;

    if (!name || !email || !password ||!mobno || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      mobno,
      password: hashedPassword,

    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(201).json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// export async function login(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "email and password are required." });
//   }

//   try {
//     const user = await findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const isPasswordValid = await compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(403).json({ message: "Invalid email or password." });
//     }

//     // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.status(200).json({ message: "Login successful."});
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in." });
//   }
// }
// exports.login = async (req, res) => {
  export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

      return res.status(200).json({ success: true, token, message: "Login successful" });
    } else {
      return res.status(403).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error("Login error:", error); // 🔴 LOGGING ERROR FOR DEBUGGING
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export async function dashboard(req, res) {
//   const token = req.headers["authorization"];
//add func validation for loggedIN
  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized." });
  // }

  try {
    // const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Welcome to the dashboard!", userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}
// import User from "../models/user.js";
// import { hash, compare } from "bcrypt";

// // User Signup
// export async function signup(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "email and password are required." });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     const hashedPassword = await hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user." });
//   }
// }

// // User Login
// export async function login(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "email and password are required." });
//   }

//   try {
//     const user = await User.findOne({ email });  // Fixed the incorrect function call
//     print("User is: ",user)
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }
//     const isPasswordValid = await compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     res.status(200).json({ message: "Login successful." });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in." });
//   }
// }

// // Protected Dashboard Route
// export async function dashboard(req, res) {
//   return res.status(200).json({ message: "Welcome to the dashboard!" });
// }

// const bcrypt = require("bcrypt");
// const user = require("../models/user");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // signup router handler
// exports.signUp = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     // if user already exist
//     const existingUser = await user.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//     //password secure
//     let hashedPassword;
//     try {
//       hashedPassword = await bcrypt.hash(password, 10);
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Error hashing password",
//       });
//     }
//     //create entry for user
//     const newUser = await user.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });
//     res.status(200).json({
//       success: true,
//       message: "User created successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: error,
//       message: "Error creating user",
//     });
//   }
// };

// //login handler
// exports.login = async (req, res) => {
//   try {
//     //fetch data
//     const { email, password } = req.body;
//     //validate user
//     if (!email || !password) {
//       return res.status(401).json({
//         success: false,
//         message: "Please provide email and password",
//       });
//     }
//     //check if user exist
//     const existingUser = await user.findOne({ email });

//     if (!existingUser) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let payload = {
//       email: existingUser.email,
//       id: existingUser._id,
//       role: existingUser.role,
//     };

//     //verify password and generate JWT token
//     if (await bcrypt.compare(password, existingUser.password)) {
//       //create jwt token
//       let token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "2h",
//       });
//         const userObject = existingUser.toObject();
 

//       userObject.token = token;
//       userObject.password = undefined;

//       let options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//       };
//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         userObject,
//         message: "User logged in successfully",
//       });
//     } else {
//       //password does not match
//       return res.status(403).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error logging in",
//       error: error,
//     });
//   }
// };






// xports.getUserInfo = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("name email");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({
//       name: user.name,
//       email: user.email,
//     });
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export async function getUserInfo(req, res) {
//   try { 
//     const user = await User.findById(req.user.id).select("name email");

//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// }
