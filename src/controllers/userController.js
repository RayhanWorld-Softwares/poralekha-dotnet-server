const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findWithId");

// get all users
const getUsers = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.email) {
      query.email = { $regex: new RegExp(req.query.email, "i") };
    }
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }

    const users = await User.find(query);
    if (!users || users.length === 0) {
      throw createError(404, "users dose not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "users were returned successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

// get single user controller
const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, `user dose not exist this email `);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

// delete user controller
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findWithId(User, id);
    await User.findByIdAndDelete({ _id: id });
    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// register user controller
const createUser = async (req, res, next) => {
  try {
    const { name, email, image, role } = req.body;
    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createError(
        409,
        "User with this email already Exist Please Login "
      );
    }
    const newUser = await User.insertMany({ name, email, image, role });
    return successResponse(res, {
      statusCode: 200,
      message: "user registration successfully",
      payload: { newUser },
    });
  } catch (error) {
    next(error);
  }
};

// update user controller
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await findWithId(User, userId);
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};
    // if (req.body.name) {
    //   updates.name = req.body.name;
    // }
    // if (req.body.role) {
    //   updates.role = req.body.role;
    // }

    // best practices
    for (let key in req.body) {
      if (["name", "role"].includes(key)) {
        updates[key] = req.body[key];
      } else if (["email"].includes(key)) {
        throw createError(400, "email can not be updated ");
      }
    }

    // update request to db
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    if (!updatedUser) {
      throw createError(404, "User with this ID dose not exist ");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "user was updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  deleteUserById,
  createUser,
  updateUserById,
};
