const express = require("express");
const {
  getUsers,
  deleteUserById,
  createUser,
  updateUserById,
  getUserByEmail,
} = require("../controllers/userController");
const userRouter = express.Router();

// GET: api/users
userRouter.post("/register", createUser);

userRouter.get("/", getUsers);
userRouter.get("/:email", getUserByEmail);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/update/:id", updateUserById);

module.exports = userRouter;
