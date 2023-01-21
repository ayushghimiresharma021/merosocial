import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }, 
    location:String,
    description:String,
    userPicturePath:String,
    picturePath:String,
    likes:{
        type:Map,
        of:Boolean
    },
    comments:{
        type : Map,
        of: String,
    }

},{timestamps:true})
const Post = mongoose.model('Post',postSchema)
export  default  Post ;