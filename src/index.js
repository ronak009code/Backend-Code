import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import express from "express";
import {app} from "./app.js";

// const app = express()
dotenv.config({
    path : './.env'
})

//Check with dotenv if error Occurs

connectDB()
app.listen(process.env.PORT || 4000, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
 })



/*
import {DB_NAME } from "./constants.js";

import express from "express"
const app = express()


( async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error) => {
           console.log("Error in server ",error);
           throw error
       })
       app.listen(process.env.PORT, () => {
          console.log("app is listening on port ${process.env.PORT}");
       })
    } catch (error) {
        console.error("ERROR ",error)
        throw error
    }
})()
    */