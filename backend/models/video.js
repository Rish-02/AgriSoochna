import { Schema, model } from "mongoose";

const videoSchema = new Schema({
  link: {
    type: String,
    required: true,
    // unique:true,
  },
  views: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

export default model("video", videoSchema);