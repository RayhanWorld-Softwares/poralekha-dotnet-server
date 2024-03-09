const express = require("express");
const { feedback } = require("../controllers/classFeedbackController");
const classFeedbackRouter = express.Router();


// from app.js  /api/feedback
classFeedbackRouter.post("/", feedback);



module.exports = classFeedbackRouter ;
