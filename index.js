import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {connectDB } from "./config/connectdb.js"
import dotenv from 'dotenv';  
dotenv.config();



//mongodb connection
connectDB();



//middlewares-----------------------------------------------------------------------------------------//

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true, limit:"50kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//-------------------------------------------------------------------------------------------------//




//-------------------------------------------------------------------------------------------------//





//Routers for Admin & User--------------------------------------------------------------------------//

import userRouter from './routes/user.routes.js';
app.use('/api/v1/user', userRouter);

import assignmentRouter from './routes/admin.routes.js';
app.use('/api/v1/admin', assignmentRouter );

//-------------------------------------------------------------------------------------------------//


//Port & listen------------------------------------------------------------------------------------//

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is started at port  no. ${PORT}.....`);
});

//-------------------------------------------------------------------------------------------------//
