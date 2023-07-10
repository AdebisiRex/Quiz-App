const express = require('express');
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
app.use(cors());
app.use(express.urlencoded({extended:true, limit:"5mb" }));
app.use(express.json({limit: "5mb"}));
require('dotenv').config();
const userRouter= require("./routes/user.route");
const questionRouter = require("./routes/question.route");
const PORT  =  process.env.PORT
app.listen(PORT, ()=>{
    console.log("App is listening at port " + PORT)
})
app.use("/question", questionRouter);
const URI = process.env.URI
mongoose.connect(URI, (err)=>{
    console.log("Mongoose Connected")
});
app.use("/user", userRouter);