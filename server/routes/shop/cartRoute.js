import express from "express";
import {
  addItemsToCart,
  deleteCartItems,
  getCartItems,
  updateCartItems,
} from "../../controllers/shop/cartController.js";

const Router = express.Router();

Router.post("/add-card", addItemsToCart);
Router.get("/get-cards/:userId", getCartItems);
Router.put("/update-card", updateCartItems);
Router.delete("/delete-card/:userId/:productId", deleteCartItems);

export default Router;
