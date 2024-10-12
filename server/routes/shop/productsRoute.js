import express from "express"
import { getFilteredProducts } from "../../controllers/shop/productsController.js"

const Router = express.Router()

Router.get("/get-product", getFilteredProducts)


export default Router