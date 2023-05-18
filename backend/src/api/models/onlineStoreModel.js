import mongoose from "mongoose";

const onlineStoreSchema = new mongoose.Schema(
  {
    drug_name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OnlineStoreProducts = mongoose.model("Product", onlineStoreSchema);

export default OnlineStoreProducts;
