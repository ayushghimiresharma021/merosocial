import express from 'express';
import { getAddOrRemoveFriend, getFriends } from '../controllers/User.js';
import { getUser } from '../controllers/User.js';
import { getViewed } from '../controllers/User.js';

import { verfiyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/:id',verfiyToken, getUser);
router.get('/:id/friends',verfiyToken,getFriends)
router.patch('/:id/:friendId',verfiyToken,getAddOrRemoveFriend)
router.patch('/viewed/:id',verfiyToken, getViewed)

export default router;