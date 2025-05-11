import { Schema, model } from "mongoose";

const languageSchema = new Schema(
  {
    prid: String,
    url: String
  }
)
const videoSchema = new Schema({
  prid: {
    type: String,
    required: true,
    // unique:true,
  },
  languages: [{
    language: languageSchema
  }]
});

export default model("video", videoSchema);