const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const Video = require("../models/videoModel");

// create video controller
const createVideo = async (req, res, next) => {
  try {
    const { moduleId, title, imgUrl, videoUrl, pdfUrl } = req.body;
    console.log(9, { moduleId, title, imgUrl, videoUrl, pdfUrl });

    if (!moduleId || !title || !imgUrl || !videoUrl || !pdfUrl) {
      throw createError(404, `imgUrl & videoUrl pdfUrl filed is requird`);
    }

    // Fetch the maximum moduleSerial value from existing videos
    const maxModuleSerialVideo = await Video.findOne({ moduleId })
      .sort({ moduleSerial: -1 })
      .limit(1);

    // Calculate the next moduleSerial value
    const nextModuleSerial = maxModuleSerialVideo
      ? maxModuleSerialVideo.moduleSerial + 1
      : 1;

    const newVideo = await Video.insertMany({
      moduleId,
      title,
      imgUrl,
      videoUrl,
      pdfUrl,
      moduleSerial: nextModuleSerial,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "file uploaded successfully",
      payload: { newVideo },
    });
  } catch (error) {
    next(error);
  }
};

// get all videos
const getVideos = async (req, res, next) => {
  try {
    const moduleId = req.params.moduleId;
    const video = await Video.find({ moduleId });
    if (!video) {
      throw createError(404, "video dose not exist with moduleId");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "video were returned successfully",
      payload: video,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVideo,
  getVideos,
};
