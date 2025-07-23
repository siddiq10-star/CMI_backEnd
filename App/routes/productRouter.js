const express = require("express");
const mongoose = require("mongoose");
const upload = require("../middleware/upload");
const productModel = require("../model/products.model");


const {
  productInsert,
  productsList,
  deleteProduct,
  updateProduct,
} = require("../controller/web/productCrud");


const productRouter = express.Router();

// ✅ Insert new product (with single image upload)
productRouter.post(
  "/productInsert",
  upload.single("p_images"),
  productInsert
);

// ✅ Get all products
productRouter.get("/productsList", productsList);

// ✅ Get single product by ID
productRouter.get("/getProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: 0, message: "Invalid ID format" });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ status: 0, message: "Product not found" });
    }

    res.status(200).json({ status: 1, product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      status: 0,
      message: "Error fetching product",
      error: err.message,
    });
  }
});

// ✅ Delete product
productRouter.delete("/deleteProduct/:id", deleteProduct);

// ✅ Update product (with single image upload)
productRouter.put(
  "/updateProduct/:id",
  upload.single("p_images"), // ✅ Corrected
  updateProduct
);

module.exports = productRouter;
