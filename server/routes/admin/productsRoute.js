import express from "express";
import { deleteProduct, editProduct, getAllProducts, handleImageUpload, setProduct } from "../../controllers/admin/productsController.js";
import { upload } from "../../config/cloudinary.js";

const Router = express.Router()

Router.post("/upload-img",upload.single("my_file"), handleImageUpload)
Router.post("/add-product", setProduct)
Router.get("/get-product", getAllProducts)
Router.put("/edit-product/:id", editProduct)
Router.delete("/detete-product/:id", deleteProduct)


export default Router