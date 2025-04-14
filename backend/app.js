import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import homeRoutes from "./routes/homeRoute.js";
import cors from "cors";

// const app = express();

const app = express();
const PORT = 3000;

app.use(express.json()); // Use Express' built-in JSON parser

connectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", homeRoutes);
app.use("/api", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// import express from "express";
// import cors from "cors";

// const app = express();

// // 🛠️ Enable CORS (Allow requests from frontend)
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // OR allow all origins (for development only)
// app.use(cors());

// app.use(express.json()); // Ensure JSON body parsing

// app.post("/api", (req, res) => {
//   res.json({ message: "Login successful!" });
// });

// app.listen(3000, () => console.log("Server running on port 3000"));

  