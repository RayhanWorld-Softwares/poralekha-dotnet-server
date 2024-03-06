const mongoose = require("mongoose");
const createError = require("http-errors");

const findWithId = async (Model, id, options = {}) => {
  try {
    const user = await Model.findById(id, options );
    if (!user) {
      throw createError(404, `${Model.modelName} dose not exist this id `);
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid User Id ");
    }
    throw error;
  }
};
module.exports = { findWithId };
