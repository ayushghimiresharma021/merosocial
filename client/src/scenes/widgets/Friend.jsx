import { useTheme } from '@emotion/react'
import { PersonRemoveOutlined } from "@mui/icons-material";
import { Button, IconButton, Typography } from '@mui/material'
import Flexbetween from 'components/Flexbox'
import UserImage from 'components/Userimage'
import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserFriends, setFriendship,  } from 'state/state';
import { Box } from '@mui/system';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setIsProfileOrHome } from 'state/state';




function Friend({friendId,name,subtitle,userPicturePath}) {



  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {_id} = useSelector((state) => state.user)
  const token = useSelector((state) => state.token) ;
  const isProfileOrHome = useSelector((state) => state.isProfileOrHome) ;



 



  const {palette} = useTheme()
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  const friends = useSelector((state) => state.friendship) ;
  const isFriend = Boolean(friends.find(({_id}) => _id === friendId)) ;
  const tag = _id===friendId
  const fr = useSelector((state) => state.user.freinds)



  const patchFriend = async() => {
    const friend = await fetch(`http://localhost:5001/user/${_id}/${friendId}`,{
      method: 'PATCH',
      headers: {Authorization:`Bearer ${token}`,
              "Content-Type": "application/json",}
  })
    const data = await friend.json()

      dispatch(setUserFriends({userFriends:data}))
      dispatch(setFriendship({friendship:data}))

    
  
    
}
const ProfilePage = async() => {
  navigate(`/profile/${friendId}`)
}



  return (
    <Flexbetween>
        
        <Flexbetween gap='1rem' >
            <UserImage  image={userPicturePath}  />
            <Box onClick={() => ProfilePage()} >
                <Typography color={main} variant="h5" fontWeight="500" sx={{   "&:hover": {     color: palette.primary.light,     cursor: "pointer",   }, }}>{name}</Typography>
                <Typography color={medium} fontSize="0.75rem">{subtitle}</Typography>
            </Box>
        </Flexbetween>
        { (tag?
        <IconButton sx={{backgroundColor: primaryLight,color: '#579BB1'}} >
            <MoreVertIcon/>
        </IconButton>:

        <IconButton onClick={patchFriend}  sx={{ backgroundColor: isFriend?'#FFF2F2':'#', p: "0.6rem",color: isFriend?'#EB455F':'#A6BB8D' }}  >
           {isFriend ? <PersonRemoveOutlined   /> : <PersonAddAltIcon />}
        </IconButton>

        )}
    </Flexbetween>
  )
}

export default Friend
