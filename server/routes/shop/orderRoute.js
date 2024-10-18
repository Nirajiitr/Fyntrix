import express from "express";
import {
  capturePayment,
  createOrder,
  getAllBougthProduct,
  getOrderDetail,
} from "../../controllers/shop/orderController.js";

const Router = express.Router();

Router.post("/create-order", createOrder);
Router.post("/save-payment", capturePayment);
Router.get("/list/:userId", getAllBougthProduct);
Router.get("/detail/:orderId", getOrderDetail);

export default Router;
