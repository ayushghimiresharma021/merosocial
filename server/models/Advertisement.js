import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:String,
    website:String,
    description:String,
})
const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export default Advertisement;