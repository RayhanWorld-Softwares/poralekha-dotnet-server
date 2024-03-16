const express = require("express");
const { createOrder, payment, paymentSuccess, paymentFail, getEnrolledClassByEmail, getEnrolledClassById } = require("../controllers/orderController");

const orderRouter = express.Router();

// GET: /api/order
orderRouter.post("/", createOrder);
orderRouter.get("/:email", getEnrolledClassByEmail);
orderRouter.get("/single/:id", getEnrolledClassById);
orderRouter.post("/payment/success/:tranId", payment);
orderRouter.post("/payment/fail/:tranId", paymentFail);


module.exports = orderRouter;
