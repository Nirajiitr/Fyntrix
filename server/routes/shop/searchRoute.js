import express from "express";
import { searchProducts } from "../../controllers/shop/searchController.js";

const Router = express.Router();

Router.post("/products/:keyword", searchProducts);

export default Router;
