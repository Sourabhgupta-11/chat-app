import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true       
    },
    password:{
        required:true,
        type: String,
        minLength:6
    },
    profilePic:{
        type:String,
        default:""
    },
},{ timestamps: true})


userSchema.pre('save',async function(next){
    const user=this;

    if(!user.isModified('password')) return next();   

    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password,salt);
        user.password=hashedPassword;
        next();
    }
    catch(error){
        return next(error);
    }
})

userSchema.methods.comparePassword=async function(userPassword){
    try{
        const isMatch=await bcrypt.compare(userPassword,this.password);
        return isMatch;
    }
    catch(error){
        throw error;
    }
}

const User=mongoose.model('user',userSchema);
export default User;