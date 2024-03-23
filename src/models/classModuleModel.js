const { Schema, model } = require("mongoose");

const classModuleSchema = new Schema(
  {
    moduleTitle: {
      type: String,
      required: [true, "moduleTitle is required "],
      trim: true,
      minlength: [10, "The length of moduleTitle can be minimum 10 characters"],
      maxlength: [50, "The length of moduleTitle can be maximum 50 characters"],
    },
    moduleNumber: {
      type: Number,
      require: true,
      default: 0 // Initial value
    },
    classId: {
      type: String,
      require: true,
    },
    className: {
      type: String,
      require: true,
    },
    teacherEmail: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const ClassModule = model("ClassModule", classModuleSchema);
module.exports = ClassModule;
