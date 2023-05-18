import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pharmacyInvoiceSchema = new Schema(
  {
    discount: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    cashierName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PharmacyInvoice = mongoose.model(
  "PharmacyInvoice",
  pharmacyInvoiceSchema
);

module.exports = PharmacyInvoice;
