import Video from "../models/video.js";
// import { hash, compare } from "bcrypt";
// // const jwt = require("jsonwebtoken");
// const JWT_SECRET = "your_jwt_secret";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
// const User = require('../models/User');

dotenv.config();
export async function getDashboardDetails(req, res) {
  try {
    const [userCount, videoCount, totalViews, usersActiveToday] = await Promise.all([
      User.countDocuments(),
      Video.countDocuments(),
      Video.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$views' },
          },
        },
      ]),
      User.countDocuments({
        // lastActiveAt: {
        //   $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
        // },
      }),
    ]);

    res.status(200).json({
      userCount,
      videoCount,
      totalVideoViews: totalViews[0]?.totalViews || 0,
      usersActiveToday,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export async function latestvideo(req,res) {
  try {
    const latestVideo = await Video.findOne().sort({ date: -1 }).exec(); // descending sort
    if (!latestVideo) {
      return res.status(404).json({ message: 'No video found' });
    }
    res.status(200).json(latestVideo);
  } catch (error) {
    console.error('Error fetching latest video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};