require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.MONGO_URI;

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

module.exports = { serverPort, mongodbURL, store_id, store_passwd, is_live,};
