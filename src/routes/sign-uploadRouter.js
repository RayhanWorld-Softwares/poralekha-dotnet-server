const express = require("express");
const { generateSignature } = require("../controllers/sign-uploadController");

const signatureRouter = express.Router();

// GET: /api/sign-upload
signatureRouter.post("/", generateSignature);



module.exports = signatureRouter;
