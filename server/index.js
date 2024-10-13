import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth/authRoute.js"
import adminProductsRoute from "./routes/admin/productsRoute.js"
import shopProductsRoute from "./routes/shop/productsRoute.js"
import shopCartRoute from "./routes/shop/cartRoute.js"
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
 app.use("/api/shop/cart", shopCartRoute)
//server
app.listen(PORT || 8080, () => {
  console.log(`server is running on port: ${PORT}`);
});
