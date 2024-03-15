const express = require("express");
const { createAssignment, getAssignment } = require("../controllers/assignmentController");

const assignmentRouter = express.Router();

//  /api/assignment
assignmentRouter.post("/", createAssignment);
assignmentRouter.get("/", getAssignment);


module.exports = assignmentRouter;
