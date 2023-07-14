import { Box } from '@mui/system'
import UserImage from 'components/Userimage';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import Flexbetween from 'components/Flexbox';
import { Call, Send } from '@mui/icons-material';
import VideoCall from '@mui/icons-material/VideoCall';
import { IconButton, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { io } from 'socket.io-client';
import './Messages.css' ;
import { setMessage } from 'state/state';

function Messages() {
    const theme = useTheme();
    const grey = theme.palette.background.alt ;
    const user = useSelector((state) => state.selectedFriend)
    const token = useSelector((state) => state.token);
    const socket = io('http://localhost:3001');
    const dispatch = useDispatch() ;
    const [msgs, setMsgs] = useState('') ;


    const messaged = useSelector((state) => state.Message)
    const [messages, setMessages] = useState(messaged)


    const id = useSelector((state) => state.user._id)
    const receiver = useSelector((state) => state.selectedFriend)
    const senderId = id 
    

    useEffect(() => {
        
        socket.on('sendMessage' ,(newMessage) => {
            const newMessages = [...messaged,newMessage]
            console.log(newMessages)
            dispatch(setMessage({message:newMessages}))

    })

        
    },[])

  
    const send = async(e) =>{
      const receiverId = receiver._id
      e.preventDefault() ;
      const data = {senderId:senderId,receiverId:receiverId,msgs:msgs,fromSelf:true}
      socket.emit('sendMessage',data)
      
      setMsgs('')

    }

    





    return (


        <>
            <Box>
                <Flexbetween>
                    <UserImage image={user.picturePath} />
                    <Typography><h2>{`${user.firstName} ${user.lastName}`}</h2></Typography>
                    <Flexbetween >
                        <IconButton style={{ marginRight: '8px' }}><Call /></IconButton>
                        <IconButton style={{ marginRight: '8px' }}><VideoCall /></IconButton>
                        <IconButton><MoreHorizIcon /></IconButton>
                    </Flexbetween>
                </Flexbetween>


                <Flexbetween flexDirection={'column'} style={{ alignItems: 'center', paddingTop: '50px' }}>
                    <Box width={'100px'} height={'100px'}>
                        <img
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                            width={'100px'}
                            height={'100px'}
                            alt="user"
                            src={`http://localhost:5001/assets/${user.picturePath}`}
                        />
                    </Box>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <p style={{ marginTop: '-20px' }}>Merosocial</p>

                </Flexbetween>
                <div style={{display:'grid'}}>
                {messaged.map(({ _id, message, fromSelf }, index) => {
                        return (
                            <>
                            {fromSelf && 
                                <div key={index} className="outgoing-msg">
                                <div key={index} className="outgoing-chats-msg">
                                    <p>{message}</p>
                                </div>
                            </div>}
                            { !fromSelf && 
                                <div key={index} className="received-msg">
                                <div key={index} className="received-msg-inbox">
                                    <p>{message}</p>
                                    
                                </div>
                            </div>

                            }

                            </>

                        )
                    })
                    }
                </div>

                
   
                
            </Box>


            <Flexbetween style={{ borderRadius: '50px', width: '100%', marginTop: '15px', placeContent: 'flex-end', backgroundColor: theme.palette.background.default, padding: '10px' }}>
                <input

                    placeholder="Search"
                    name="friends"
                    className="searchChat"
                    value={msgs}
                    onChange={(e) => { setMsgs(e.target.value) }}
                    type={'text'}
                    style={{
                        paddingLeft: '10px',
                        width: '100%',
                        outline: 'none',
                        border: 'none',
                        backgroundColor: theme.palette.background.default,
                    }} />
                <IconButton onClick={send}>
                    <Send />
                </IconButton>
            </Flexbetween>






        </>

    )
}

export default Messages
