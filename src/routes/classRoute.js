const express = require("express");
const { addClass,  getClassesByEmail } = require("../controllers/classControllers");
const classRouter = express.Router();



// from app.js  /api/class
classRouter.post("/", addClass);
classRouter.get("/:email", getClassesByEmail)



module.exports = classRouter ;
