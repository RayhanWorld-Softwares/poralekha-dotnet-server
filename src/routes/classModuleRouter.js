const express = require("express");
const { createModule, getClassModuleByclassId } = require("../controllers/classModuleController");

const classModuleRouter = express.Router();

// GET: /api/classModule
classModuleRouter.post("/", createModule);
classModuleRouter.get("/:classId", getClassModuleByclassId);



module.exports = classModuleRouter;
