// models/User.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  progress: {
    currentDay: {
      type: Number,
      default: 0,
    },
    completedMedia: [
      {
        day: Number,
        mediaTitle: String,
        date: Date,
      },
    ],
  },
});

export default model("User", userSchema);
