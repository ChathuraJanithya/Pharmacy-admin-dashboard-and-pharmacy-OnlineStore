import express from "express";
import cors from "cors"; //cross-origin resource sharing : access control
import logger from "./utils/logger"; //UTILS
import "dotenv/config";
import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2> 🏥 Dental Clinic Management System API</h2>");
  next();
});

/* chathura-------------------------------------------------- */
/* routes */
import productRouter from "./api/routes/MS_productRoute.js";
import orderRouter from "./api/routes/MS_orderRoute.js";
import storeRouter from "./api/routes/onlineStoreRoute.js";
const pharmacyInvoiceRoute = require("./api/routes/pharmacyInvoiceRoute");
const pharmacyRoute = require("./api/routes/pharmacyDrugDetails");

//using pharmacy Routes
app.use("/Pharmacy", pharmacyRoute);
app.use("/PharmacyInvoice", pharmacyInvoiceRoute);

//using online store Routes
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/stores", storeRouter);

/*----------------------- Chathura END ----------------------- */

app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect();
});
