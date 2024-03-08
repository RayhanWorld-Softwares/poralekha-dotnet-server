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
      throw createError(409, " already form submited Please Wait ");
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

// get all teacher request
const getTeacherRequest = async (req, res, next) => {
  try {
    const teacherRequest = await Teacher.find();
    if (!teacherRequest) {
      throw createError(404, "teacher request dose not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "teacher request returned successfully",
      payload: { teacherRequest },
    });
  } catch (error) {
    next(error);
  }
};

// status update teacher request controller
const updateTeacherReqStatusById = async (req, res, next) => {
  try {
    const teacherReqId = req.params.id;
    await findWithId(Teacher, teacherReqId);
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};

    // best practices
    for (let key in req.body) {
      if (["status"].includes(key)) {
        updates[key] = req.body[key];
      } 
    }
    // update request to db
    const teacherUpdateStatus = await Teacher.findByIdAndUpdate(
      teacherReqId,
      updates,
      updateOptions
    );
    if (!teacherUpdateStatus) {
      throw createError(404, "Teacher Req.. with this ID dose not exist ");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "teacher Req.. status updated successfully",
      payload: teacherUpdateStatus,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  createTeacher,
  getTeacherRequest,
  updateTeacherReqStatusById,
};
