const express = require("express");
const { addClass,  getClassesByEmail, updateClassById, getSingleClassById, deleteClassById, getClasses } = require("../controllers/classControllers");
const classRouter = express.Router();



// from app.js  /api/class
classRouter.post("/", addClass);
classRouter.get("/", getClasses);
classRouter.delete("/:id", deleteClassById);
classRouter.get("/find/:id", getSingleClassById);
classRouter.get("/:email", getClassesByEmail)
classRouter.put("/update/:id", updateClassById)


module.exports = classRouter ;
