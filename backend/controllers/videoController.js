import Video from "../models/video.js";
import { hash, compare } from "bcrypt";
// const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import video from "../models/video.js";

dotenv.config();
// export async function createVideo(req, res) {
//   try {
//     let link = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//     let views = 0
//     let date = new Date();
//     console.log(link, views,date);
//     const newVideo = await Video.create({
//       link,
//       views,
//       date,
//     });

//     return res.status(201).json({ success: true, message: "Video registered successfully" });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

export async function allVideos(req,res) {
    try {
        const videos = await Video.find(); // Fetch all videos from DB
        console.log(videos);
        res.status(200).json(videos);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }  
};

export async function recommended(req, res) {
  try {
    const videos = await Video.find()
      .sort({ date: -1 }) // Descending order by date
      .skip(1)            // Skip the latest video
      .limit(4);          // Get the next 4

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}