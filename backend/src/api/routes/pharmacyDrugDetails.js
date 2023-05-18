import express from "express";
import logger from "../../utils/logger";
let Pharmacy = require("../models/pharmacyDrugDetailsModel");

const router = express.Router();

//CREATE
router.route("/add").post((req, res) => {
  const drug_name = req.body.drug_name;
  const availability = Number(req.body.availability);
  const unit_Price = req.body.unit_Price;
  const supplier = req.body.supplier;
  const description = req.body.description;

  //initializing
  const newPharmacy = new Pharmacy({
    drug_name,
    availability,
    unit_Price,
    supplier,
    description,
  });

  newPharmacy
    .save()
    .then(() => {
      res.json("Record added");
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//Display
router.route("/").get((req, res) => {
  Pharmacy.find()
    .then((pharmacys) => {
      res.json(pharmacys);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

//UPDATE
//async : syncronized ossa
router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id; //fetching userID
  const { drug_name, availability, unit_Price, supplier, description } =
    req.body;
  const updatePharmacy = {
    drug_name,
    availability,
    unit_Price,
    supplier,
    description,
  };

  const update = await Pharmacy.findByIdAndUpdate(userID, updatePharmacy)
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

//DELETE
router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Pharmacy.findByIdAndDelete(userID)
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

//read one record
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;

  const user = await Pharmacy.findById(userID)
    .then((pharmacy) => {
      res.status(200).send({ status: " User fetched", pharmacy });
    })
    .catch((err) => {
      logger.error(err.message);
      res
        .status(500)
        .send({ status: "Data reading unsuccessful", error: err.message });
    });
});

module.exports = router;
