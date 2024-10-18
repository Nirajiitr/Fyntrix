import express from "express";
import {
  addReview,
  getReview,
} from "../../controllers/shop/productReviewController.js";

const Router = express.Router();

Router.post("/add-review", addReview);
Router.get("/get-review/:productId", getReview);

export default Router;
