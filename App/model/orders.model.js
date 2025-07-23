let mongoose = require("mongoose");

let ordersSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
    },
    c_name: {
      type: String,
      required: true,
    },
    c_email: {
      type: String,
      required: true,
    },
    c_city: {
      type: String,
      required: true,
    },
    c_pincode: {
      type: Number,
      required: true,
    },
    c_number: {
      type: Number,
      required: true,
    },
    c_altNumber: {
      type: Number,
    },
    c_address: {
      type: String,
      required: true,
    },
    grand_total: {
      type: Number,
      required: true,
    },
    product_details: {
      p_name: { type: String },
      p_price: { type: String },
      p_varient: { type: String },
      p_discount: { type: String },
      p_displayPrice: { type: String },
      p_code: { type: String },
      p_brand: { type: String },
      p_color: { type: String },
      p_display: { type: String },
      p_camera: { type: String },
      p_processor: { type: String },
      p_battery: { type: String },
      p_condition: { type: String },
      p_description: { type: String },
      p_accessories: { type: String },
      p_images: [{ type: String }],
    },
  },
  { timestamps: true }
);

let orderModel = mongoose.model("orders", ordersSchema);

module.exports = orderModel;
