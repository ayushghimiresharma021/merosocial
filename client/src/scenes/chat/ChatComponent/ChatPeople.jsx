import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import Flexbetween from 'components/Flexbox';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Edit, Search } from '@mui/icons-material';
import './ChatPeople.css'; 
import { setMessage, setSelectedFriend } from 'state/state';

function ChatPeople() {
  const theme = useTheme();
  const friends = useSelector((state) => state.friendship);
  const dispatch = useDispatch();
  
  const [indexOf, setIndexOf] = useState(0);
  const light = theme.palette.neutral.light
  const senderId = useSelector((state) =>state.user._id)
  const token = useSelector((state) => state.token)
  
  const message = useSelector((state) => state.Message)
  const last = message[message.length -1]

  const newbie = async() => {
    const receiverId = friends[indexOf]._id
    const response = await fetch(`http://localhost:5001/message/chat/${senderId}/${receiverId}`,{
        method:'GET',
        headers: {Authorization:`Bearer ${token}`},
    })
    const message = await response.json()
    console.log(message)
    dispatch(setSelectedFriend({selectedFriend: friends[indexOf]}))
    dispatch(setMessage({message:message}))


  }
  

  useEffect(() => {
    
    newbie()

  },[indexOf])

  return (
    <Box
      style={{
        padding: '10px',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '1rem',
      }}
    >
      <Flexbetween>
        <Typography>
          <h1>Chats</h1>
        </Typography>
        <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <IconButton style={{ backgroundColor: 'whitesmoke', marginRight: '10px' }}>
            <VideoCallIcon />
          </IconButton>
          <IconButton style={{ backgroundColor: 'whitesmoke' }}>
            <Edit />
          </IconButton>
        </Box>
      </Flexbetween>
      <Box
        className="ChatInput"
        style={{
          borderRadius: '50px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton>
          <Search />
        </IconButton>
        <input
          placeholder="Search"
          name="friends"
          className="searchChat"
          style={{
            outline: 'none',
            border: 'none',
            backgroundColor: theme.palette.background.default,
          }}
        />
      </Box>
      {friends &&
        friends.map(({ firstName, lastName, picturePath }, index) => {
          return (
            <Box
              key={index}
              onClick={() => setIndexOf(index)}
              className="Friends"
              style={{
                backgroundColor: index === indexOf ? light: theme.palette.background.alt,
                display: 'flex',
                alignItems: 'center',
                margin: '10px',
                paddingLeft: '10px',
                borderRadius: '5px',
              }}
            >
              <img
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                width={'50px'}
                height={'50px'}
                alt="user"
                src={`http://localhost:5001/assets/${picturePath}`}
              />
              <Box style={{ padding: '5px' }}>
                <h3>{`${firstName} ${lastName}`}</h3>
                <p style={{ marginTop: '-10px' }}>{'this is message'}</p>
              </Box>
              <Divider />
            </Box>
          );
        })}
    </Box>
  );
}

export default ChatPeople;
