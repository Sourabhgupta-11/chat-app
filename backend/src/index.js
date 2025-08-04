//-----------------------------------------------------------------------------------------//
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import db from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//-----------------------------------------------------------------------------------------//
const app=express();
const PORT=process.env.PORT

//-----------------------------------------------------------------------------------------//
app.get('/',(req,res)=>{
    res.send("hello users")
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

//-----------------------------------------------------------------------------------------//
app.listen(PORT,()=>{
    console.log("App is listening on PORT: " + PORT);
})