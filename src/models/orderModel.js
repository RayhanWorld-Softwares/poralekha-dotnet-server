const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
    classId: {
      type: String,
      require: true,
    },
    paidStatus: {
      type: Boolean,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    classTitle: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    teacherName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Order = model("Order", orderSchema);
module.exports = Order;
