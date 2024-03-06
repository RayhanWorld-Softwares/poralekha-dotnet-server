const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required "],
      trim: true,
      minlength: [3, "The length of user name can be minimum 3 characters"],
      maxlength: [31, "The length of user name can be maximum 31 characters"],
    },
    email: {
      type: String,
      require: false,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const User = model("Users", userSchema);
module.exports = User;
