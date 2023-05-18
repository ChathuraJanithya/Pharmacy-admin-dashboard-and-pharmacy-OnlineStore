import express from "express";
import logger from "../../utils/logger.js";
import OnlineStoreProducts from "../models/onlineStoreModel.js";

const router = express.Router();

// @desc    Fetch all products
router.get("/", (req, res) => {
  OnlineStoreProducts.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});
// @desc    Fetch single product
router.get("/:drug_name", (req, res) => {
  const drug_name = req.params.drug_name;
  OnlineStoreProducts.findOne({ drug_name: drug_name })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

export default router;
