require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.MONGO_URI

module.exports = { serverPort, mongodbURL };
