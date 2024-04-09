const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/mernjs");
const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const signup = mongoose.model("Signup", signupSchema);
module.exports = signup;
