//-----------------------------------------------------------------------------------------//
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import db from './lib/db.js'
import authRoutes from './routes/auth.route.js'

//-----------------------------------------------------------------------------------------//
const app=express();
const PORT=process.env.PORT

//-----------------------------------------------------------------------------------------//
app.get('/',(req,res)=>{
    res.send("hello users")
})

app.use(express.json())
app.use('/api/auth',authRoutes)

//-----------------------------------------------------------------------------------------//
app.listen(PORT,()=>{
    console.log("App is listening on PORT: " + PORT);
})