const { Schema, model } = require("mongoose");

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        text: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const Quiz = model("Quiz", quizSchema);
module.exports = Quiz;
