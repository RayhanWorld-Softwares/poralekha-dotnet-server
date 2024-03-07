const express = require("express");
const { createTeacher, getTeacherRequest } = require("../controllers/teacherControllers");
const teacherRouter = express.Router();



// from app.js  /api/teacher
teacherRouter.post("/", createTeacher);
teacherRouter.get("/request", getTeacherRequest);



module.exports = teacherRouter;
