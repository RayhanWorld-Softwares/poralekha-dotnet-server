const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dudjn6epk",
  api_key: "698939185558578",
  api_secret: "l7BngdAv6nnvrJl2gDFVlgQPjsA",
  secure: true,
});

const generateSignature = (req, res, next) => {
  const { folder } = req.body;

  if (!folder) {
    throw createError(404, `folder name is requird`);
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      "l7BngdAv6nnvrJl2gDFVlgQPjsA"
    );

    return successResponse(res, {
      statusCode: 200,
      message: "generateSignature successfully",
      payload: { timestamp, signature },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSignature,
};
