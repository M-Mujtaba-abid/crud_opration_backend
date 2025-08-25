import express from "express"
import { categoryFilter, createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controler.js"
import { protect } from "../middleware/authJWT.js"

const route=express.Router()


route.post("/createproduct" , protect ,createProduct )
route.get("/getallproduct" ,protect ,getAllProducts )
route.patch("/updateproduct/:id",protect ,updateProduct )
route.delete("/deleteproduct/:id",protect ,deleteProduct )
route.get("/categoryFilter",protect  ,categoryFilter )




export default route