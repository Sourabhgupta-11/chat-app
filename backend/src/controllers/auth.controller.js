import User from "../models/user.model.js"
import { generateToken} from "../middleware/jwt.js"

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

export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'})
        }

        const payload={
            id: user.id
        }
        const token=generateToken(payload,res)
        res.status(200).json({token:token})
    }
    catch(err){
        res.status(500).json({err:"Internal Server Error"})
    }
}


export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        res.status(500).json({err:"Internal Server Error"})
    }
}

export const updateProfile=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({err:"Internal Server Error"})
    }
}