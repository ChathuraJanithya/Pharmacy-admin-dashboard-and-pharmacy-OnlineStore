import express from "express";
import logger from "../../utils/logger";
let PharmacyInvoice = require("../models/pharmacyInvoiceModel");

const invoiceRouter = express.Router();

invoiceRouter.route("/addInvoice").post((req, res) => {
  const cashierName = req.body.cashierName;
  const customerName = req.body.customerName;
  const discount = req.body.discount;
  const tax = req.body.tax;
  const invoiceNumber = req.body.invoiceNumber;
  const items = req.body.items;
  const totalBill = req.body.totalBill;

  const dAt = req.body.date;
  const options = { timeZone: "Asia/Kolkata" };
  const date = dAt.toLocaleString("en-US", options);

  const newPharmacyInvoice = new PharmacyInvoice({
    cashierName,
    customerName,
    discount,
    tax,
    invoiceNumber,
    items,
    totalBill,
    date,
  });

  newPharmacyInvoice
    .save()
    .then(() => {
      res.json("Record added");
    })
    .catch((err) => {
      logger.error(err.message);
    });
});
//fetch all data
invoiceRouter.route("/").get((req, res) => {
  PharmacyInvoice.find()
    .then((pharmacyInvoices) => {
      res.json(pharmacyInvoices);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//route to fetch data for specific date
invoiceRouter.route("/getInvoicefor/:date").get(async (req, res) => {
  try {
    const date = new Date(req.params.date);

    // Create a new Date object for the next day to represent the end of the date range
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const data = await PharmacyInvoice.find({
      date: {
        $gte: date.toISOString(),
        $lt: nextDay.toISOString(),
      },
    });

    if (data.length === 0) {
      res.status(404).send("No data found for the requested date.");
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});
//route to update data
invoiceRouter.route("/updateInvoice/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    cashierName,
    customerName,
    discount,
    tax,
    invoiceNumber,
    items,
    totalBill,
    date,
  } = req.body;

  const updatePharmacyInvoice = {
    cashierName,
    customerName,
    discount,
    tax,
    invoiceNumber,
    items,
    totalBill,
    date,
  };
  const updateinfor = await PharmacyInvoice.findByIdAndUpdate(
    userId,
    updatePharmacyInvoice
  )
    .then(() => {
      res.status(200).send({ status: "Update completed." });
    })
    .catch((err) => {
      logger.error(err.message);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});
//route to delete data
invoiceRouter.route("/deleteInvoice/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await PharmacyInvoice.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Successfully deleted" });
    })
    .catch((err) => {
      logger.error(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

module.exports = invoiceRouter;
