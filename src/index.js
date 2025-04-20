
import dotenv from "dotenv";
import connectDB from "./DB/index.js";

dotenv.config({
    path : './.env'
})





connectDB()

















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