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
import { verfiyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

import { users } from "./data/data.js";
import { posts } from "./data/data.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Advertisement from "./models/Advertisement.js";







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


{/* File storage */ }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://ayushghimire95:admin@cluster0.z9m6bqp.mongodb.net/socialpedia')
.then(() => {
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
}).catch(err => console.log(err));



{/* for uploading the data in the server ,we first have to make an id for the site so this is udes at first */ }
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