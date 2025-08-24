import express from "express"
import app from "./src/app.js"
import dotenv from "dotenv"
import { DbConnection } from "./src/db/DataBase.js"


dotenv.config()
const PORT = process.env.PORT

DbConnection()



app.listen(PORT , ()=>{
    console.log("server is running on the port ", PORT)
})
