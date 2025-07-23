const orderModel = require("../../model/orders.model");
const generateOrderId = require("../../utils/generateOrderId");

// ✅ INSERT Order
let orderInsert = async (req, res) => {
  try {
    let {
      c_name,
      c_email,
      c_city,
      c_pincode,
      c_number,
      c_altNumber = null,
      c_address,
      grand_total,
      product_details, // full product object
    } = req.body;

    const order_id = await generateOrderId(); // ✅ generate unique order ID

    let newOrder = new orderModel({
      order_id,
      c_name,
      c_email,
      c_city,
      c_pincode,
      c_number,
      c_altNumber,
      c_address,
      grand_total,
      product_details, // saving full object
    });

    await newOrder.save();

    res.status(201).send({
      status: 1,
      message: "Order Submitted Successfully",
      data: newOrder,
    });
  } catch (err) {
    console.error("❌ Error in submitting:", err.message);
    res.status(500).send({
      status: 0,
      message: "Error submitting order",
      error: err,
    });
  }
};

// ✅ GET all Orders
let orders = async (req, res) => {
  try {
    let orderList = await orderModel.find();
    res.status(200).json({
      status: 1,
      message: "Orders List",
      data: orderList,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: "Error fetching orders",
      error: err,
    });
  }
};

// ✅ DELETE Order
let orderDelete = async (req, res) => {
  try {
    let deleteID = req.params.id;
    let deleteRes = await orderModel.deleteOne({ _id: deleteID });
    res.send({
      status: 1,
      message: "Order Deleted Successfully",
      id: deleteID,
      delRes: deleteRes,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Error deleting order",
      error: err,
    });
  }
};

// ✅ UPDATE Order
let orderUpdate = async (req, res) => {
  try {
    let updateID = req.params.id;
    let {
      c_name,
      c_email,
      c_city,
      c_pincode,
      c_number,
      c_altNumber,
      c_address,
      grand_total,
      product_details,
    } = req.body;

    let updateObj = {
      c_name,
      c_email,
      c_city,
      c_pincode,
      c_number,
      c_altNumber,
      c_address,
      grand_total,
      product_details,
    };

    let updateRes = await orderModel.updateOne({ _id: updateID }, updateObj);

    res.send({
      status: 1,
      message: "Order Updated Successfully",
      updateRes,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Error updating order",
      error: err,
    });
  }
};

module.exports = { orderInsert, orders, orderDelete, orderUpdate };
