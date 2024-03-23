const createError = require("http-errors");
const Classes = require("../models/ClassesModel");
const ClassModule = require("../models/classModuleModel");
const { successResponse } = require("./responsControllers");

// class module create controller
const createModule = async (req, res, next) => {
  try {
    const { moduleTitle, classId } = req.body;
    const classInfo = await Classes.findById(classId);
    if (!classInfo) {
      throw createError(404, `class dose not exist this id `);
    }
    // Fetch the maximum moduleSerial value from existing videos
    const maxModuleSerialVideo = await ClassModule.findOne({classId}).sort({ moduleNumber: -1 }).limit(1);
    // Calculate the next moduleSerial value
    const nextModuleSerial = maxModuleSerialVideo ? maxModuleSerialVideo.moduleNumber + 1 : 1;
    const { title: className, email: teacherEmail } = classInfo;
    const newClassModule = await ClassModule.insertMany({
      moduleNumber: nextModuleSerial,
      moduleTitle,
      classId,
      className,
      teacherEmail,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "class module added successfully",
      payload: { newClassModule },
    });
  } catch (error) {
    next(error);
  }
};

const getClassModuleByclassId = async (req, res, next) => {
  try {
    const classId = req.params.classId;
    const module = await ClassModule.find({ classId });
    if (!module) {
      throw createError(404, `module dose not exist this email `);
    }
    return successResponse(res, {
      statusCode: 200,
      message: "class module were returned successfully",
      payload: module,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createModule,
  getClassModuleByclassId,
};
