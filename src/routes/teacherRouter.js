const express = require("express");
const { createTeacher } = require("../controllers/teacherControllers");
const teacherRouter = express.Router();



// from app.js  /api/teacher
teacherRouter.post("/", createTeacher);



module.exports = teacherRouter;
