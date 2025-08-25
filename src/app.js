import express from "express"
import userRoutes from "../src/routes/user.route.js"
import productRoutes from "../src/routes/product.route.js"
import cookieParser from "cookie-parser"


const app=express()

app.use(express.json())
app.use(cookieParser());

app.use("/user",userRoutes)
app.use("/product", productRoutes)



app.get("/",(req,res)=>{
    res.send("server is running on 8000 ")
})






export default app