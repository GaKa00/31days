// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

module.exports = mongoose.model("User", userSchema);
