import mongoose from "mongoose";

const messageNotification = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    fromSelf:Boolean
},{timestamps:true})

const Message = mongoose.model('Message',messageNotification) ;
export default Message ;