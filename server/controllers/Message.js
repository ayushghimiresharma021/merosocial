import Message from "../models/Message.js";

export const getMessage = async(req,res) => {
    try {
        const {id,MessageId} = req.params 
        const message = await Message.find({senderId:id,receiverId:MessageId}).sort({timestampField: 1})

        console.log(message)

        res.status(201).json(message)

    } catch (error) {
        console.log(error.message)
        res.status(404).json({error:error.message})
        
    }
}