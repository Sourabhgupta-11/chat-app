import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import db from './lib/db.js'

const app=express();
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log("App is listening on PORT: " + PORT);
})