import mongoose from "mongoose";

const notificationSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:String,
    firstName:String,
    lastName:String,
    likedOrComment:{
        type:String,
        enum:['liked', 'comment','posted'],
    },
    friendPicturePath:String,
    

},{timestamps:true})

const Notification = mongoose.model('Notification',notificationSchema)
export default Notification ;
