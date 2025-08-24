import express from "express"
import { createProduct, getAllProducts, updateProduct } from "../controllers/product.controler.js"

const route=express.Router()


route.post("/createproduct" ,createProduct )
route.get("/getallproduct" ,getAllProducts )
route.patch("/updateproduct/:id" ,updateProduct )



export default route