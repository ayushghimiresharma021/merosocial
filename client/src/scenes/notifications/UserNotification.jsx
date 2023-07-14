import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux' ;
import Divider from '@mui/material/Divider';
import Flexbetween from 'components/Flexbox';

function UserNotification() {
  const mode = useSelector((state) => state.mode)
  const visible = useSelector(state => state.visible)
  const notification = useSelector(state => state.notifications)
  console.log(notification)

    
    
  return <Box borderRadius={'10px'} display={visible?'Block':'none'} zIndex='30' boxShadow={`0px 0px 2px 2px black` } padding={'10px 15px'} position={'fixed'} top='80px' left='850px'  sx={{backgroundColor:mode==='dark'?'#18122B':'#fff'}} style={{alignItems:'center',placeItems:'center'}}>
  <h1>Notifications</h1>
  <Divider />
  {notification!=0 && notification.map(({firstName,lastName,friendPicturePath,likedOrComment}) => {
   return <>
  <Flexbetween>
    <Flexbetween margin={'10px 5px'}>
      <img src={`http://localhost:5001/assets/${friendPicturePath}`} style={{borderRadius:'50%',height:'50px',width:'50px',margin:'2px 7px'}} />
   
      {likedOrComment!='Added'?(<p><span style={{fontWeight:'bold'}}>{firstName} {lastName}</span> has {likedOrComment} on your post.</p>):
      <p><span style={{fontWeight:'bold'}}>{firstName} {lastName}</span> has Added You as Friend.</p>}
    </Flexbetween>
  </Flexbetween>
  <Divider/>
  </>})}
</Box>
}

export default UserNotification ;
