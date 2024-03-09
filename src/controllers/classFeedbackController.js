const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const ClassFeedback = require("../models/classFeedbackModel");

// class feedback controller from admin
const feedback = async (req, res, next) => {
  try {
    const { userName, title, feedbackText, image } = req.body;
    if (!userName || !title || !feedbackText || !image) {
      throw createError(404, " field is requier please try again ");
    }
    const newFeedback = await ClassFeedback.insertMany({
      userName,
      title,
      feedbackText,
      image,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "feedback added successfully",
      payload: { newFeedback },
    });
  } catch (error) {
    next(error);
  }
};


// get all classes
const getClassFeedback = async (req, res, next) => {
  try {
    const feedbacks = await ClassFeedback.find();
    if (!feedbacks) {
      throw createError(404, "class feedback dose not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "class  feedback returned successfully",
      payload: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  feedback,
  getClassFeedback,
};
