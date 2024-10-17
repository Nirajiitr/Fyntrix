import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth/authRoute.js"
import adminProductsRoute from "./routes/admin/productsRoute.js"
import shopProductsRoute from "./routes/shop/productsRoute.js"
import shopSearchRoute from "./routes/shop/searchRoute.js"
import shopCartRoute from "./routes/shop/cartRoute.js"
import shopAddressRoute from "./routes/shop/addressRoute.js"
import shopOrderRoute from "./routes/shop/orderRoute.js"
import adminOrderRoute from "./routes/admin/orderRoute.js"
import productReviewRoute from "./routes/shop/productReviewRoute.js"


const app = express();
const PORT = process.env.PORT;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

// db connection
connectDB();

//allow server
const corsOption = {
  origin: CLIENT_BASE_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};
app.use(cors(corsOption));

// middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
 app.use("/api/auth", authRoute)
 app.use("/api/admin/products", adminProductsRoute)
 app.use("/api/shop/products", shopProductsRoute)
 app.use("/api/shop/search", shopSearchRoute)
 app.use("/api/shop/cart", shopCartRoute)
 app.use("/api/shop/address", shopAddressRoute)
 app.use("/api/shop/order", shopOrderRoute)
 app.use("/api/admin/order", adminOrderRoute)
 app.use("/api/shop/review", productReviewRoute)
//server
app.listen(PORT || 8080, () => {
  console.log(`server is running on port: ${PORT}`);
});
