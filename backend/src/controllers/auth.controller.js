import User from "../models/user.model.js"
import { generateToken } from "../lib/jwt.js"

export const signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body

        if(!fullName || !email || !password) res.status(400).json({message:"All field are required"})
            
        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }
        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"Email already exist"});

        const newUser=new User({
            fullName,
            email,
            password
        });
        const response=await newUser.save();

        const payload={
            id: response.id
        }
        const token=generateToken(payload,res)
        res.status(200).json({response: response,token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const login=(req,res)=>{
    res.send("login")
}
export const logout=(req,res)=>{
    res.send("logout")
}