const Counter = require("../model/counter");

const generateOrderId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "order_id" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const padded = String(counter.seq).padStart(8, "0");
  return `CMI${padded}`;
};

module.exports = generateOrderId;
