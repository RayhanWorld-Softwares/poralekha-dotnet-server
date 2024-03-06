const { Schema, model } = require("mongoose");

const teacherSchema = new Schema(
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
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
    experience: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
