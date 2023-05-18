import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
  drug_name: {
    type: String,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  unit_Price: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
