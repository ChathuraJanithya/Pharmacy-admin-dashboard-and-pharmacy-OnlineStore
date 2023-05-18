import express from "express";
import logger from "../../utils/logger.js";
import Order from "../models/MS_orderModel.js";
import ScheduledOrder from "../models/MS_scheduledOrderModel.js";

const orderRouter = express.Router();

//save order
orderRouter.post("/addOrder", (req, res) => {
  const customer_name = req.body.customer_name;
  const card_number = req.body.card_number;
  const expire_Date = req.body.expire_Date;
  const cvv = req.body.cvv;
  const total_bill = req.body.total_bill;
  const order_items = req.body.order_items;
  const order_date = req.body.order_date;

  const newOrder = new Order({
    customer_name,
    card_number,
    expire_Date,
    cvv,
    total_bill,
    order_items,
    order_date,
  });
  newOrder
    .save()
    .then(() => {
      res.json("Record added");
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//get all orders
orderRouter.get("/getorders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//Save scheduled order
orderRouter.post("/addScheduledOrder", (req, res) => {
  const scheduledCustomerName = req.body.scheduledCustomerName;
  const scheduledDate = req.body.scheduledDate;
  const scheduledEmailAdress = req.body.scheduledEmailAdress;
  const customerContact = req.body.customerContact;
  const oder_items = req.body.oder_items;
  const total_bill = req.body.total_bill;

  const newScheduledOrder = new ScheduledOrder({
    scheduledCustomerName,
    scheduledDate,
    scheduledEmailAdress,
    customerContact,
    oder_items,
    total_bill,
  });
  newScheduledOrder
    .save()
    .then(() => {
      res.json("Record added");
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//read scheduled orders - get all
orderRouter.get("/getScheduledOrders", (req, res) => {
  ScheduledOrder.find()
    .then((scheduledOrders) => {
      res.json(scheduledOrders);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});
//Reminder email
const nodemailer = require("nodemailer");

//send email
async function sendReminderEmail(order) {
  console.log(order);
  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "it21263880@my.sliit.lk", // Your email address
        pass: "200109004280", // Your email password
      },
    });

    // Send reminder email
    let info = await transporter.sendMail({
      from: '"it21263880@my.sliit.lk', // Sender address
      to: order.scheduledEmailAdress, // Scheduled email address
      subject: "Order Reminder", // Subject line
      text: `Hi ${
        order.scheduledCustomerName
      },\n\nJust a friendly reminder that your order is scheduled for ${new Date(
        order.scheduledDate
      ).toLocaleDateString()}.\n\nSincerely,\nYour Company`, // Plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
    throw new Error(`Error sending reminder email: ${err.message}`);
  }
}

orderRouter.post("/sendReminder", async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const order = await ScheduledOrder.findById(orderId);

    if (!order) {
      return res.sendStatus(404);
    }

    await sendReminderEmail(order);

    // Return success response
    res.json({ message: "Reminder email sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default orderRouter;
