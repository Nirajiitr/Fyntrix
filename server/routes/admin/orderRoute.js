import express from "express"
import { getAllOrder, getOrderDetail, updateOrderStatus } from "../../controllers/admin/orderController.js"


const Router = express.Router()
Router.get("/list", getAllOrder)
Router.get("/detail/:orderId", getOrderDetail)
Router.put("/update/:orderId", updateOrderStatus)

export default Router