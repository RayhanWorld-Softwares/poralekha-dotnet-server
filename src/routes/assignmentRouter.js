const express = require("express");
const { createAssignment } = require("../controllers/assignmentController");

const assignmentRouter = express.Router();

//  /api/assignment
assignmentRouter.post("/", createAssignment);


module.exports = assignmentRouter;
