// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// });

// const User = mongoose.model("User", userSchema);
// export default User;
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    // unique:true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  mobno: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
//   role: {
//     type: String,
//     enum: ["Admin", "Student", "visitor"],
//   },
});

export default model("user", userSchema);