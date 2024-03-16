const createError = require("http-errors");
const { successResponse } = require("./responsControllers");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findWithId");
const Classes = require("../models/ClassesModel");
const uuid = require("uuid");
const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../models/orderModel");
const { store_id, store_passwd, is_live } = require("../secret");

// create order controller
const createOrder = async (req, res, next) => {
  try {
    const { userId, email, name, classId } = req.body;
    const classInfo = await findWithId(Classes, classId);
    const tranID = uuid.v4();

    const data = {
      total_amount: classInfo?.price,
      currency: "BDT",
      tran_id: tranID, // use unique tran_id for each api call
      success_url: `http://localhost:5000/api/order/payment/success/${tranID}`,
      fail_url: `http://localhost:5000/api/order/payment/fail/${tranID}`,
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: classInfo?.title,
      product_category: "Electronic",
      product_profile: "general",
      cus_name: name,
      cus_email: email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    // Convert the callback to an async function
    const apiResponse = await sslcz.init(data);

    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    const orderData = {
      userId: userId,
      name: name,
      email: email,
      classId: classId,
      paidStatus: false,
      transactionId: tranID,
      classTitle: classInfo?.title,
      price: classInfo?.price,
      teacherName: classInfo?.name,
      image: classInfo?.image,
    };
    const result = await Order.create(orderData);
    console.log("Redirecting to: ", GatewayPageURL);
  } catch (error) {
    next(error);
  }
};

// payment POST controller payment/success/:tranId
const payment = async (req, res, next) => {
  try {
    const transactionId = req.params.tranId;
    // Find the order by transactionId
    const order = await Order.findOne({ transactionId });
    if (!order) {
      throw createError(404, "Order with this transaction ID does not exist");
    }

    // Update the paidStatus to true
    order.paidStatus = true;
    await order.save();

    if (order.paidStatus === true) {
      res.redirect("http://localhost:5173/student-dashboard/my-enroll-class");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Paid status updated to true",
    });
  } catch (error) {
    next(error);
  }
};

const paymentFail = async (req, res, next) => {
  try {
    const transactionId = req.params.tranId;
    const order = await Order.findOne({ transactionId });
    const result = await Order.deleteOne({ transactionId });
    if (result.deletedCount) {
      res.redirect(`http://localhost:5173/payment/fail/${transactionId}`);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "order was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get single user controller
const getEnrolledClassByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const enrolledClass = await Order.find({ email });
    if (!enrolledClass) {
      throw createError(404, `student dose not enrolled this email `);
    }

    return successResponse(res, {
      statusCode: 200,
      message: "enrolledClass were returned successfully",
      payload: enrolledClass,
    });
  } catch (error) {
    next(error);
  }
};

// get single user controller
const getEnrolledClassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById({ _id: id });
    if (!order) {
      throw createError(404, `student dose not enrolled this id `);
    }
    const { classTitle } = order;
    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted successfully",
      payload: { classTitle },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  payment,
  paymentFail,
  getEnrolledClassByEmail,
  getEnrolledClassById,
};
