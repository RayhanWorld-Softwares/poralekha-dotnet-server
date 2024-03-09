const express = require("express");
const { feedback, getClassFeedback } = require("../controllers/classFeedbackController");
const classFeedbackRouter = express.Router();


// from app.js  /api/feedback
classFeedbackRouter.post("/", feedback);
classFeedbackRouter.get("/", getClassFeedback);



module.exports = classFeedbackRouter ;
