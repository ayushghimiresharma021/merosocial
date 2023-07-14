import User from "../models/User.js";
import Notification from "../models/notifications.js";

export const getUser  = async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const getFriends = async(req,res) => {
    const {id} = req.params
    try {
        const {id} = req.params ;
        const user = await User.findById(id)

        {/*since we store the id of that particular friends in the freinds list of a user not the name of that friend */}

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        
        const formattedFriends = friends.map(
          ({ _id, firstName, lastName, occupation, location, picturePath,friends}) => {
            return { _id, firstName, lastName, occupation, location, picturePath};
          }
        );
        

        res.status(200).json(formattedFriends)


    } catch (error) {
        res.status(404).json({message: error.message})
    }
}



export const getAddOrRemoveFriend = async(req,res) => {

        try {
          const { id, friendId } = req.params ;
          const user = await User.findById(id);
          
          const friend = await User.findById(friendId);
          
      
          if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
          } else {
            user.friends.push(friendId);
            friend.friends.push(id);
            const newFriend = new Notification({
              userId:friendId,
              postId:id,
              firstName:user.firstName,
              lastName:user.lastName,
              friendPicturePath:user.picturePath,
              likedOrComment:'Added',

            })
            await newFriend.save() ;
          }
          await user.save();
          await friend.save();
      
          const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
      
          res.status(200).json(formattedFriends);
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
}


export const getViewed = async(req,res) => {
  try {
    const { id } = req.params
    const user =  await User.findById(friendId) ;
    console.log(user)
    const {viewedProfile} = user ;
    const updated = parseInt(viewedProfile)+1

    const updatedUser = await User.findByIdAndUpdate(id,
      {viewedProfile:updated.toString()}
      )
    
    res.status(200).json({message:'successs'})
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}