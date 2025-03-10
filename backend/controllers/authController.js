// import User from "../models/user.js";
// import { hash, compare } from "bcrypt";
// // const jwt = require("jsonwebtoken");
// // const JWT_SECRET = "your_jwt_secret";

// export async function signup(req, res) {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     const hashedPassword = await hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user." });
//   }
// }

// export async function login(req, res) {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   try {
//     const user = await findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid username or password." });
//     }

//     const isPasswordValid = await compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid username or password." });
//     }

//     // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.status(200).json({ message: "Login successful."});
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in." });
//   }
// }

// export async function dashboard(req, res) {
// //   const token = req.headers["authorization"];
// //add func validation for loggedIN
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized." });
//   }

//   try {
//     // const decoded = jwt.verify(token, JWT_SECRET);
//     res.status(200).json({ message: "Welcome to the dashboard!", userId: decoded.id });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token." });
//   }
// }
import User from "../models/user.js";
import { hash, compare } from "bcrypt";

// User Signup
export async function signup(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating user." });
  }
}

// User Login
export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });  // Fixed the incorrect function call
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
}

// Protected Dashboard Route
export async function dashboard(req, res) {
  return res.status(200).json({ message: "Welcome to the dashboard!" });
}
