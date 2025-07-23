let express = require("express");
const {
  orderInsert,
  orders,
  orderDelete,
  orderUpdate,
} = require("../../controller/web/ordersCrud");

let orderRouter = express.Router();

orderRouter.post("/orderInsert", orderInsert);
orderRouter.get("/orders", orders);
orderRouter.delete("/orderDelete/:id", orderDelete);
orderRouter.put("/orderUpdate/:id", orderUpdate);

module.exports = orderRouter;
