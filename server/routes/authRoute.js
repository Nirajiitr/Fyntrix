import express from "express"
import { login, logout, register } from "../controllers/authController.js"
import { isAuthenticated } from "../middlewere/isAuthenticated.js"
import { checkAuth } from "../controllers/checkAuth.js"

const Router = express.Router()
 Router.post("/register", register)
 Router.post("/login", login)
 Router.post("/logout", logout)
 Router.get("/check-auth", isAuthenticated, checkAuth)


export default Router
