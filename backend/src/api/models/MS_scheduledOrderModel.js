import mongoose from "mongoose";

const scheduledOrderSchema = new mongoose.Schema(
  {
    scheduledCustomerName: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledEmailAdress: {
      type: String,
      required: true,
    },
    customerContact: {
      type: Number,
      required: true,
    },
    order_items: {
      type: Array,
      required: true,
    },
    total_bill: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScheduledOrder = mongoose.model("ScheduledOrder", scheduledOrderSchema);

export default ScheduledOrder;
