import express from "express"

const app=express()
app.use(express())

app.get("/",(req,res)=>{
    res.send("server is running on 8000 ")
})






export default app