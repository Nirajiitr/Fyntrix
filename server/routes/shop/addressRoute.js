import express from "express";
import {
  addAddress,
  deleteAddress,
  getAllAdress,
  updateAddress,
} from "../../controllers/shop/addressController.js";

const Router = express.Router();

Router.post("/add-address", addAddress);
Router.get("/get-address/:userId", getAllAdress);
Router.put("/update-address/:userId/:addressId", updateAddress);
Router.delete("/delete-address/:userId/:addressId", deleteAddress);

export default Router;
