const express = require("express");
const { createTeacher, getTeacherRequest, updateTeacherReqStatusById, getTeacherRequestByEmail } = require("../controllers/teacherControllers");
const teacherRouter = express.Router();



// from app.js  /api/teacher
teacherRouter.post("/", createTeacher);
teacherRouter.get("/:email", getTeacherRequestByEmail);
teacherRouter.get("/", getTeacherRequest);
teacherRouter.put("/:id", updateTeacherReqStatusById);



module.exports = teacherRouter;
