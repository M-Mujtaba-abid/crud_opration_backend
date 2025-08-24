import express from "express"
import { categoryFilter, createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controler.js"

const route=express.Router()


route.post("/createproduct" ,createProduct )
route.get("/getallproduct" ,getAllProducts )
route.patch("/updateproduct/:id" ,updateProduct )
route.delete("/deleteproduct/:id" ,deleteProduct )
route.get("/categoryFilter" ,categoryFilter )




export default route