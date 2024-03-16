const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const Assignment = require("../models/assignmentModel");

// create assignment controller
const createAssignment = async (req, res, next) => {
  try {
    const { title, endDate, description } = req.body;
    const assignment = await Assignment.insertMany({
      title,
      endDate,
      description,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "assignment created successfully",
      payload: { assignment },
    });
  } catch (error) {
    next(error);
  }
};

// get all teacher request
const getAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.find();
    if (!assignment) {
      throw createError(404, "assignment dose not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "assignment returned successfully",
      payload: assignment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssignment,
  getAssignment,
};
