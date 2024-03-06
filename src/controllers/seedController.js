const data = require("../data");
const User = require("../models/userModel");
const seedUser = async (req, res, next) => {
  try {
    // delete all existing users
    await User.deleteMany({});

    // instering new user
    const users = await User.insertMany(data.users);

    // successful res
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
module.exports = {seedUser}