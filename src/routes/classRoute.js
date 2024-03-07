const express = require("express");
const { addClass,  getClassesByEmail, updateClassById, getSingleClassById, deleteClassById } = require("../controllers/classControllers");
const classRouter = express.Router();



// from app.js  /api/class
classRouter.post("/", addClass);
classRouter.delete("/:id", deleteClassById);
classRouter.get("/find/:id", getSingleClassById);
classRouter.get("/:email", getClassesByEmail)
classRouter.put("/update/:id", updateClassById)


module.exports = classRouter ;
