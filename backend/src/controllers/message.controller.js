import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar =async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({err:"Internal Server Error"})
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({err:"Internal Server Error"})
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageURL;
        if(image){
            const uploadImage=await cloudinary.uploader.upload(image);
            imageURL=uploadImage.secure_url;
        }

        const message=new Message({
            senderId,
            receiverId,
            text,
            image:imageURL,
        })

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({err:"Internal Server Error"})
    }
}