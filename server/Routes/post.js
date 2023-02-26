import express from 'express';
import { getFeedPosts, getLikeOrUnlike, getUserPosts } from '../controllers/posts.js';
const router = express.Router()
import { verfiyToken } from '../middleware/auth.js';
import { getPostedComments,getComments } from '../controllers/posts.js';
import { getNotifications } from '../controllers/posts.js';

router.get('/',verfiyToken,getFeedPosts)
router.get('/:userId/posts',verfiyToken ,getUserPosts)
router.get('/:postId/comments',verfiyToken, getComments)
router.post('/:userId/:postId/comment/',verfiyToken,getPostedComments)
router.patch('/:id/like',verfiyToken ,getLikeOrUnlike) ;
router.get(`/notifications/:userId`,getNotifications)

export default router;