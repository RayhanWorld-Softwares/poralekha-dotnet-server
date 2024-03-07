const { Schema, model } = require("mongoose");

const classSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "The length of user name can be minimum 3 characters"],
      maxlength: [31, "The length of user name can be maximum 31 characters"],
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    image: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },

    description: {
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
const Classes = model("Classes", classSchema);
module.exports = Classes;
