const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/userRouter");
const seedRouter = require("./routes/seedRouter");
const { errorResponse } = require("./controllers/responsControllers");
const teacherRouter = require("./routes/teacherRouter");
const classRouter = require("./routes/classRoute");
const classFeedbackRouter = require("./routes/classFeedbackRoute");
const app = express();
const orderRouter = require("./routes/orderRoute");
const assignmentRouter = require("./routes/assignmentRouter");
const videoRouter = require("./routes/videoRouter");
const signatureRouter = require("./routes/sign-uploadRouter");
const classModuleRouter = require("./routes/classModuleRouter");

const rateLimiter = rateLimit({
  WindowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: "Too many requests from this IP. please try again",
});

// router middleware
app.use(cors());
app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router middleware
app.use("/api/users", userRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/seed", seedRouter);
app.use("/api/class", classRouter);
app.use("/api/feedback", classFeedbackRouter);
app.use("/api/order", orderRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/classModule", classModuleRouter);


// file upload router
app.use("/api/videos", videoRouter)
app.use("/api/sign-upload", signatureRouter)

app.get("/", (req, res) => {
  res.status(200).send({
    message: " get poralekha server is running",
  });
});

// client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

// server error handling -> all the errors
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
