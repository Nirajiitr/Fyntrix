import express from "express";
import { isAuthenticated } from "../../middlewere/isAuthenticated.js";
import { login,  register } from "../../controllers/auth/authController.js";
import { checkAuth } from "../../controllers/auth/checkAuth.js";

const Router = express.Router();
Router.post("/register", register);
Router.post("/login", login);
Router.get("/check-auth", isAuthenticated, checkAuth);

export default Router;
