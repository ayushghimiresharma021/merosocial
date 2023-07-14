import { useTheme } from "@emotion/react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendList from "scenes/widgets/FriendList";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/postsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { setFriendship, setIsProfileOrHome } from "state/state";

const Profile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch() ;
  const {_id} = useSelector((state) => state.user) ;
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const friends = useSelector((state) => state.friendship) ;
  const isProfileOrHome = useSelector((state) => state.isProfileOrHome)


  const mode = useSelector((state) => state.mode)


  const getUser = async () => {
    const response = await fetch(`http://localhost:5001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data)
    
  };


  const getFriends = async () => {
    
    const friends = await fetch(`http://localhost:5001/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const friends_list = await friends.json()
      console.log(friends_list)
      dispatch(setFriendship({friendship:friends_list}))
      
    }
  useEffect(() => {
    
    getUser();
    if (userId!==_id){
      getFriends() ;
    }
    dispatch(setIsProfileOrHome({isProfileOrHome:'profile'}))

    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        position={'absolute'}
        top = '70px'
        zIndex={'0'}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget  userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList friends={friends} isProfile={true} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          
          <Box m={'2rem 0'} />
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
