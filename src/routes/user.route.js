import express from "express"
import { loginUser, RegisterUser } from "../controllers/user.controller.js";
import {
  validateRegisterUser,
  validateLoginUser,
  handleUserValidationErrors,
} from "../middleware/validationForUser.js";

const route= express.Router()

route.post("/register", validateRegisterUser, handleUserValidationErrors, RegisterUser)

route.post("/login", validateLoginUser, handleUserValidationErrors, loginUser)


export default route