const express=require('express')
const app = express()
const cors = require("cors")

const connect=require("./config/db.js")
const registerController=require("./controllers/register.controller")
const usersController=require("./controllers/user.controller")
const postController=require("./controllers/post.controller")
const {loginController}=require("./controllers/login.controller")
const likesController=require("./controllers/like.controller")
const commentsController=require("./controllers/comment.controller")
const followsController=require("./controllers/follow.controller")
const savedpostsController=require("./controllers/savedposts.controller")
//middlewares
app.use(cors())
app.use(express.json())


//controllers
app.use("/register",registerController)
app.use("/login",loginController)
app.use("/users",usersController)
app.use("/posts",postController)
app.use("/likes",likesController)
app.use("/comments",commentsController)
app.use("/follows",followsController)
app.use("/savedposts",savedpostsController)


app.listen(8000,async () => {
    await connect()
    console.log("listening on port 8000 pininterst")
})