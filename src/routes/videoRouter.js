const express = require("express");
const { createVideo, getVideos } = require("../controllers/videoController");

const videoRouter = express.Router();

// GET: /api/videos
videoRouter.post("/", createVideo);
videoRouter.get("/:moduleId", getVideos);

module.exports = videoRouter;
