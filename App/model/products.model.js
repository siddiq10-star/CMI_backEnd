let mongoose = require("mongoose");
// 🔁 Validate max 3 images
const arrayLimit = (val) => val.length <= 3;

let productSchema = new mongoose.Schema({
  p_name: {
    type: String,
    required: true,
  },
  p_varient: {
    type: String,
    required: true,
  },
  p_discount: {
    type: String,
  },
  p_displayPrice: {
    type: String,
    required: true,
  },
  p_price: {
    type: String,
    required: true,
  },
  p_code: {
    type: String,
  },
  p_brand: {
    type: String,
  },
  p_color: {
    type: String,
  },
  p_display: {
    type: String,
  },
  p_camera: {
    type: String,
  },
  p_processor: {
    type: String,
  },
  p_battery: {
    type: String,
  },
  p_condition: {
    type: String,
  },
  p_discription: {
    type: String,
  },
  p_accessories: {
    type: String,
  },
  p_images: {
    type: String,
    required: true,
  },
});

let productModel = mongoose.model("products", productSchema);

module.exports = productModel;
