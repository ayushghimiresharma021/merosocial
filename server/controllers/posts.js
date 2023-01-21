import Post from "../models/Post.js"
import User from "../models/User.js"

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        
        const newPost = new Post({
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          description,
          userPicturePath: user.picturePath,
          picturePath,
          likes: {},
          comments: [],

        });
        

        await newPost.save();
    
        const post = await Post.find();
        
        res.status(201).json({newPost:post,Notification:'New Post'});


      } catch (err) {
        res.status(409).json({ message: err.message });
      }
} 





export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params
        const user = await Post.find({userId})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}



export const getLikeOrUnlike  =  async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body

        const post  = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId,true)
        }
        const UpdatesPost  = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        )
        res.status(200).json(UpdatesPost)

         

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const getPostedComments = async (req, res) => {
    try {
        const {userId,postId} = req.params 
        
        const {comment} = req.body
                
        const post = await Post.findById(postId) ;
        post.comments.set(userId.toString(), comment) ;
        
        const posted = await Post.findByIdAndUpdate(
            postId,
            {comments:post.comments},
            {new:true}
        )

        res.status(200).json(posted)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const getComments = async(req, res) => {
    try {
        const {postId} = req.params
        const post = await Post.findById(postId)
        console.log(post)
        const commenting = []

        post.comments.forEach((value,key) => commenting.push(key))
        const commentUser = await Promise.all(
           commenting.map((comment) => User.findById(comment))
        )
        const formattedComments = commentUser.map(
            ({_id,firstName,lastName,picturePath}) => {
                const comments = post.comments.get(_id)
                const name = `${firstName} ${lastName}`
                return {_id,name,picturePath,comments}

            
        })


        res.status(200).json(formattedComments)
    } 
    catch (error) {
        res.status(500).json({message:error.message})
    }
}