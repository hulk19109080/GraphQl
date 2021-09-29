const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
