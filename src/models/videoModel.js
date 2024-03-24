const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
  {
    moduleId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    pdfUrl: {
      type: String,
      require: true,
    },
    moduleSerial: {
      type: Number,
      required: true,
      default:  0 // Initial value
    },
  },
  { timestamps: true }
);
const Video = model("Video", videoSchema);
module.exports = Video;
