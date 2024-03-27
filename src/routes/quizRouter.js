const express = require("express");
const { createQuiz } = require("../controllers/quizController");

const quizRouter = express.Router();

// api/quiz
quizRouter.post("/", createQuiz);



module.exports = quizRouter;
