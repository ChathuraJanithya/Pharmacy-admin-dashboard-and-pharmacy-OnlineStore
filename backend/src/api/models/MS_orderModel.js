import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
  expire_Date: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  total_bill: {
    type: Number,
    required: true,
  },
  order_items: {
    type: Array,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
