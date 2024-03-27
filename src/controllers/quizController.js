const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const Quiz = require("../models/quizModel");

// create quiz controller
const createQuiz = async (req, res, next) => {
  try {
    const { title, questions } = req.body;

    const quizExist = await Quiz.findOne({ title });
    if (quizExist) {
      throw createError(409, "Quiz with this title already exists");
    }

    const newQuiz = await Quiz.create({ title, questions });

    return successResponse(res, {
      statusCode: 200,
      message: "Quiz created successfully",
      payload: { newQuiz },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
};
