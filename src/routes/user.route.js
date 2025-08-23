import express from "express"
import { loginUser, RegisterUser } from "../controllers/user.controller.js";

const route= express.Router()

route.post("/register", RegisterUser)
route.post("/login", loginUser)


export default route