import express from "express";
import { getMessage } from "../controllers/Message.js";
import { verfiyToken } from '../middleware/auth.js';

const router = express.Router();
router.get('/chat/:id/:MessageId',verfiyToken,getMessage);

export default router