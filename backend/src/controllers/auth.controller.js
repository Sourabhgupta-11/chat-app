import User from "../models/user.model.js"

export const signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body
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

        res.status(200).json({response:response})
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