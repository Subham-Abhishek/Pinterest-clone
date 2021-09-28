const express=require('express')
const app = express()
const connect=require("./config/db.js")
const registerController=require("./controllers/register.controller")
const {loginController}=require("./controllers/login.controller")
app.use("/register",registerController)
app.use("/login",loginController)


app.listen(8000,async () => {
    await connect()
    console.log("listening on port 8000 pininterst")
})