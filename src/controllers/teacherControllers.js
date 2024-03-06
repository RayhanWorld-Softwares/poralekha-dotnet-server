const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findWithId");
const Teacher = require("../models/teacherModel");


// register user controller
const createTeacher = async (req, res, next) => {
  try {
    const { name, title, email, image, experience, category, status } =
      req.body;
    const userExist = await Teacher.exists({ email: email });
    if (userExist) {
      throw createError(
        409,
        " already form submited Please Wait "
      );
    }
    if (
      !name ||
      !title ||
      !email ||
      !image ||
      !experience ||
      !category ||
      !status
    ) {
      throw createError(404, " field is requier please try again ");
    }

    const newTeacher = await Teacher.insertMany({
      name,
      title,
      email,
      image,
      experience,
      category,
      status,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "teacher application submit successfully",
      payload: { newTeacher },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeacher,
};
