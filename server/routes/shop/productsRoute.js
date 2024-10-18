import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/productsController.js";

const Router = express.Router();

Router.get("/get-product", getFilteredProducts);
Router.get("/get-product/:id", getProductDetails);

export default Router;
