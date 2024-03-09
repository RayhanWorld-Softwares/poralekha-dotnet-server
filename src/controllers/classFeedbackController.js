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

module.exports = {
  feedback,
};
