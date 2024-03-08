const express = require("express");
const { addClass,  getClassesByEmail, updateClassById, getSingleClassById, deleteClassById, getClasses, updateClassStatusById, getClassesByStatus } = require("../controllers/classControllers");
const classRouter = express.Router();



// from app.js  /api/class
classRouter.post("/", addClass);
classRouter.get("/", getClasses);
classRouter.get("/:status", getClassesByStatus);
classRouter.delete("/:id", deleteClassById);
classRouter.get("/find/:id", getSingleClassById);
classRouter.get("/email/:email", getClassesByEmail)
classRouter.put("/update/:id", updateClassById)
classRouter.put("/:id", updateClassStatusById)


module.exports = classRouter ;
