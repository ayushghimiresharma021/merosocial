import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux' ;
import Divider from '@mui/material/Divider';

function UserNotification({notification}) {
  const mode = useSelector((state) => state.mode)
  console.log(notification)

    
    
  return (
    notification.map(({firstName,lastName,friendPicturePath,likedOrComment}) => {
    <Box sx={{height:'400px',width:'200px',backgroundColor:mode==='dark'?'#18122B':'#ECF2FF'}} style={{display:'flex',alignItems:'center',placeItems:'center'}}>
      <div>
        <div>
          <img src={`http://localhost:5001/assets/${friendPicturePath}`} style={{borderRadius:'50%',height:'50px',width:'50px'}} />
        </div>
        <div>
          <p><span style={{fontWeight:'bold'}}>{firstName} {lastName}</span> has {likedOrComment} on your post.</p>
        </div>
      </div>
      <Divider/>
    </Box>
    })
  )
}

export default UserNotification ;
