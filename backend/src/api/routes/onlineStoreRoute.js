import express from "express";
import logger from "../../utils/logger.js";
import OnlineStoreProducts from "../models/onlineStoreModel.js";

const storeRouter = express.Router();

//upload products
storeRouter.route("/addmed").post((req, res) => {
  const drug_name = req.body.drug_name;
  const category = req.body.category;
  const description = req.body.description;
  const image = req.body.image;
  const price = req.body.price;
  const countInStock = req.body.countInStock;
  const brand = req.body.brand;

  const newOnlineStore = new OnlineStoreProducts({
    drug_name,
    category,
    description,
    image,
    price,
    countInStock,
    brand,
  });

  newOnlineStore
    .save()
    .then(() => {
      res.json("Successfully Uploaded.");
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(400).json({
        error: "Failed to upload data",
      });
    });
});

//Delete products
storeRouter.route("/delete/:id").delete(async (req, res) => {
  let productId = req.params.id;
  await OnlineStoreProducts.findByIdAndDelete(productId)
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

//fetch single product
storeRouter.route("/get/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await OnlineStoreProducts.findById({ _id: id });
    res.status(201).json(singleProduct);
  } catch (err) {
    res.status(422).json(err);
  }
});

//edit products
storeRouter.route("/edit/:id").put(async (req, res) => {
  let productId = req.params.id;
  const {
    drug_name,
    category,
    description,
    image,
    price,
    countInStock,
    brand,
  } = req.body;

  const updateProduct = {
    drug_name,
    category,
    description,
    image,
    price,
    countInStock,
    brand,
  };

  const update = await OnlineStoreProducts.findByIdAndUpdate(
    productId,
    updateProduct
  )
    .then(() => {
      res.status(200).send({ status: "Successfully updated" });
    })
    .catch((err) => {
      logger.error(err.message);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

/* seedRouter.get("/", async (req, res) => {
  //await OnlineStoreProducts.remove({});
  const createdProducts = await OnlineStoreProducts.insertMany(data.products);
  res.send({ createdProducts });
}); */

// Storage
/* const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept only jpeg, jpg, and png files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
}).single("image");

// Create function
// Create function
storeRouter.route("/addmed").post((req, res) => {
  upload(req, res, (err) => {
    if (err) {
      logger.error(err.message);
      return res.status(400).json({
        error: "File upload failed",
      });
    }

    if (req.file) {
      // check if req.file exists
      const newOnlineStore = new OnlineStoreProducts({
        drug_name: req.body.drug_name,
        category: req.body.category,
        description: req.body.description,
        image: {
          data: fs.readFileSync(req.file.path), // Read file data and set to image data
          contentType: req.file.mimetype, // Set content type from uploaded file
        },
        price: req.body.price,
        countInStock: req.body.countInStock,
        brand: req.body.brand,
      });

      newOnlineStore
        .save()
        .then(() => {
          res.json("Successfully Uploaded.");
        })
        .catch((err) => {
          logger.error(err.message);
          res.status(400).json({
            error: "Failed to upload data",
          });
        });
    } else {
      // handle case where req.file is undefined
      logger.error("No file uploaded");
      return res.status(400).json({
        error: "No file uploaded",
      });
    }
  });
}); */

// Read function

export default storeRouter;
