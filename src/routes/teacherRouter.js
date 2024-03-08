const express = require("express");
const { createTeacher, getTeacherRequest, updateTeacherReqStatusById } = require("../controllers/teacherControllers");
const teacherRouter = express.Router();



// from app.js  /api/teacher
teacherRouter.post("/", createTeacher);
teacherRouter.get("/request", getTeacherRequest);
teacherRouter.put("/:id", updateTeacherReqStatusById);



module.exports = teacherRouter;
