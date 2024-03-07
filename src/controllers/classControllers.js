const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const Classes = require("../models/ClassesModel");

// register user controller
const addClass = async (req, res, next) => {
  try {
    const { name, title, email, image, price, description } = req.body;

    if (!name || !title || !email || !image || !price || !description) {
      throw createError(404, " field is requier please try again ");
    }

    const newClass = await Classes.insertMany({
      name,
      title,
      email,
      image,
      price,
      description,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "class added successfully",
      payload: { newClass },
    });
  } catch (error) {
    next(error);
  }
};

// get all class filter by email
const getClassesByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const allClass = await Classes.find({email});
    if (!allClass) {
      throw createError(404, `class dose not exist this email `);
    }
    return successResponse(res, {
      statusCode: 200,
      message: "all class returned successfully",
      payload: { allClass },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addClass,
  getClassesByEmail,
};
