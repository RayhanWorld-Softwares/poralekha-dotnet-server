const express = require("express");
const { createOrder, payment, paymentSuccess, paymentFail } = require("../controllers/orderController");

const orderRouter = express.Router();

// GET: /api/order
orderRouter.post("/", createOrder);
orderRouter.post("/payment/success/:tranId", payment);
orderRouter.post("/payment/fail/:tranId", paymentFail);


module.exports = orderRouter;
