import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();

export const generateToken=(userData,res)=>{
    const token=jwt.sign(userData,process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        sameSite: "strict",
        secure: process.env.NODE_ENV!=="development",
    })

    return token;
}

export const jwtAuthMiddleware=async(req,res,next)=>{

    const token=req.cookies.jwt;

    if(!token) return res.status(401).json({error: 'Unauthorized'})

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({message:"Unauthorized"})

        const user=await User.findById(decoded.id).select("-password");
        if(!user) return res.status(404).json({message:"User not found"})
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).json({error:"Invalid Token"})
    }
}


