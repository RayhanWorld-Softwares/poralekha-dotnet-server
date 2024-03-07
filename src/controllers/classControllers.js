const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const Classes = require("../models/ClassesModel");
const { findWithId } = require("../services/findWithId");

// register user controller
const addClass = async (req, res, next) => {
  try {
    const { name, title, email, image, price, description, status } = req.body;
    if (!name || !title || !email || !image || !price || !description || !status) {
      throw createError(404, " field is requier please try again ");
    }
    const newClass = await Classes.insertMany({
      name,
      title,
      email,
      image,
      price,
      description, 
      status,
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

// update class controller
const updateClassById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await findWithId(Classes, userId);
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};

    // best practices
    for (let key in req.body) {
      if (["title", "price", "description", "image"].includes(key)) {
        updates[key] = req.body[key];
      } else if (["email"].includes(key)) {
        throw createError(
          400,
          "email can not be updated "
        );
      }
    }

    // update request to db
    const updatedClass = await Classes.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    if (!updatedClass) {
      throw createError(404, "Class with this ID dose not exist ");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Class updated successfully",
      payload: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};


// get single class controller
const getSingleClassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cls = await findWithId(Classes, id);
    await Classes.findById(id);
    return successResponse(res, {
      statusCode: 200,
      message: "class find successfully",
      payload: cls
    });
  } catch (error) {
    next(error);
  }
};


// delete user controller
const deleteClassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await findWithId(Classes, id);
    await Classes.findByIdAndDelete({ _id: id });
    return successResponse(res, {
      statusCode: 200,
      message: "class was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addClass,
  getClassesByEmail,
  updateClassById,
  getSingleClassById,
  deleteClassById,
};
