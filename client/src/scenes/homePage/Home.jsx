import { Box, useMediaQuery } from '@mui/material'
import Advertisement from 'components/Advertisement';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MyPostWidget from 'scenes/widgets/MyPostWidget' ;
import PostsWidget from 'scenes/widgets/postsWidget';
import UserWidget from 'scenes/widgets/UserWidget'
import Navbar from '../navbar/Navbar'
import { setAdvertisement, setFriendship, setIsProfileOrHome } from 'state/state';
import { useDispatch } from 'react-redux';
import FriendList from 'scenes/widgets/FriendList';


function Home() {
  
  const { _id, picturePath,friends } = useSelector((state) => state.user)
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const advertisement = useSelector((state) => state.advertisement)
  const friends_list = useSelector((state) => state.friendship)
  const isProfileOrHome = useSelector((state) => state.isProfileOrHome) ;



  const newAd =  async() => {

    const response = await  fetch(`http://localhost:5001/advertisement`,{
        method:'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json();
      dispatch(setAdvertisement({advertisement:data}))
      
  }
  const getFriends = async () => {
    const friends = await fetch(`http://localhost:5001/user/${_id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const friendslists = await friends.json()
      console.log(friendslists)
      dispatch(setFriendship({friendship:friendslists}))
      
    }

  useEffect(() => {
    
    newAd();
    getFriends() ;
    dispatch(setIsProfileOrHome({isProfileOrHome:'home'})) ;
  },[])

  return (
    <Box>
      <Navbar />
      <Box width={'100%'} padding='2rem 4%' display={isNonMobile ? 'flex' : 'block'} gap='0.5rem' justifyContent='space-between'>
        <Box flexBasis={isNonMobile ? '26%' : undefined} >
          <UserWidget  userId={_id} picturePath={picturePath} />
        </Box>

        <Box flexBasis={isNonMobile ? '45%' : undefined} mt={isNonMobile ? undefined : "2rem"} >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} isProfile={false} />
        </Box>

        {isNonMobile && (
        <Box flexBasis='26%' >
          {advertisement && advertisement.map(({_id,image,description,title,website}) => 
            <Advertisement key={_id} image={image} description={description} title={title} website={website}  />
          )}
          <Box m='2rem 0'>
            {friends_list && <FriendList friends={friends_list}  />}
          </Box>
        </Box>
        )}
      </Box>
    </Box>
  )
}

export default Home ;
