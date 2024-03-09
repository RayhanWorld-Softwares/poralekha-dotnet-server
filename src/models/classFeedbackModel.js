const { Schema, model } = require("mongoose");

const classFeedbackSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    feedbackText: {
      type: String,
      require: true,
    },

    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const ClassFeedback = model("ClassFeedback", classFeedbackSchema);
module.exports = ClassFeedback;
