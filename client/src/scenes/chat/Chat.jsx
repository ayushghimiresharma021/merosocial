import React from 'react'
import Flexbetween from 'components/Flexbox'
import { Box, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleIcon from '@mui/icons-material/People';
import ChatPeople from './ChatComponent/ChatPeople';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useTheme } from '@emotion/react';

import { useSelector } from 'react-redux';
import Messages from './ChatComponent/Messages';
import './Chat.css' ;

function Chat() {
    const theme = useTheme();
    const grey = theme.palette.background.alt
    const user = useSelector((state) => state.user)

    
    return (
        <>
            <Flexbetween>
                <Box position={'fixed'} top='10px' left='10px'>
                    <Flexbetween borderRadius={'3px'} style={{ backgroundColor: grey, padding: '10px', paddingBottom:'10px' }} flexDirection={'column'} >
                        <IconButton style={{ fontSize: 32 }} ><ChatBubbleIcon /></IconButton>
                        <IconButton style={{ fontSize: 32 }} ><PeopleIcon /></IconButton>
                        <IconButton style={{ fontSize: 32 }} ><ArchiveIcon /></IconButton>
                        <div style={{paddingTop:'300px'}}>
                        <img                            
                            style={{ objectFit: "cover", borderRadius: "50%"}}
                            width= {'40px'}
                            height={'40px'}
                            alt="user"
                            src={`http://localhost:5001/assets/${user.picturePath}`}
                        />
                        </div>
                        
                    </Flexbetween>
                </Box>
                <Box width={'350px'} position='absolute' left={'85px'}  top='10px' flexBasis={'30%'} style={{ backgroundColor: grey}}>
                    <ChatPeople/>
                </Box>

                <Box className='messageContainer'  style={{backgroundColor:grey,zIndex:'0',position:'fixed', padding:'15px', left:'460px',top:'10px', width:'40%',height:'100%'}} >
                    <Messages/>
                </Box>

            </Flexbetween>
        </>
    )
}

export default Chat
