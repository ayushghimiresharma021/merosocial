import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { register } from "./controllers/auth.js";
import authRoutes from './Routes/auth.js'
import userRoutes from './Routes/user.js';
import postRoutes from './Routes/post.js';
import messageRoutes from './Routes/message.js';
import { verfiyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { Server } from "socket.io";
import { users } from "./data/data.js";
import { posts } from "./data/data.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Advertisement from "./models/Advertisement.js";
import http from 'http';
import Message from "./models/Message.js";
import { messages } from "./data/Message.js";








const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan("common"));
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const server = http.createServer(app)
const io = new Server(server,{
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST'],
          allowedHeaders: ['my-custom-header'],
          credentials: true
        }
}) ;



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

server.listen(3001,() =>{
    console.log('server is running on server 3001')
})

const upload = multer({ storage: storage });

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://ayushghimire95:admin@cluster0.z9m6bqp.mongodb.net/socialpedia')
.then(() => {
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
        
        
}).catch(err => console.log(err));

io.on('connection', (socket) => {
    console.log('User connection')
    socket.on('sendMessage', async({senderId,receiverId,msgs,fromSelf}) => {
        console.log('Received message')
        const newMessage = new Message({senderId,receiverId,message:msgs,fromSelf:true})
        const newMessage2 =  new Message({senderId:receiverId,receiverId:senderId,message:msgs,fromSelf:false})
        await newMessage.save()
            
        await newMessage2.save() ;
        io.emit('sendMessage', newMessage)
        
        
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

}) ;



app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', upload.single('picture'), createPost)





app.get('/advertisement',verfiyToken, async (req, res) => {
    try {
        const ad = await Advertisement.find()
        console.log(ad)
        res.status(200).json(ad)
        
    } catch (error) {
        res.status(404).json({ message: console.error() })
    }
})

{/* for getting information from the server */ }
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/posts', postRoutes)
app.use('/message',messageRoutes)