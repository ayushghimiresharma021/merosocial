import { Delete, Send } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Flexbetween from 'components/Flexbox';
import UserImage from 'components/Userimage';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import WidgetWrapper from 'components/WidgetsWrapper';
import { useNavigate } from 'react-router-dom';
import {InputBase} from '@mui/material';
import { useTheme } from '@emotion/react';
import {IconButton} from '@mui/material';


function Comments({ postId,postUserId }) {
  const [comments, setComments] = useState('')
  const { _id, picturePath, firstName, lastName} = useSelector((state) => state.user)
  const userFriends =  useSelector((state) => state.userFriends)
  const token = useSelector((state) => state.token)
  const [commentList, setCommentList] = useState([])
  const navigate = useNavigate()
  const {palette} = useTheme()
  const isTrue = Boolean(userFriends.find(({_id}) => postUserId===_id ))
  console.log(isTrue)
  
  


  



  
  

  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;
  const neutralLight = palette.neutral.light;





  console.log(postId)
  const submitComment = async (Type) => {
  


    const reaponse = await fetch(`http://localhost:5001/posts/${_id}/${postId}/comment/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
    },
      body: JSON.stringify({ comment:comments }),
    })
    setComments('')
    getComments()
  }
  




  const getComments = async () => {
    const response = await fetch(`http://localhost:5001/posts/${postId}/comments`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const commented = await response.json()
    setCommentList(commented) 

  }
  useEffect(() => {
    getComments() ;
  }, [])





  return (

    
      
      <Box mt="0.6rem">
      
          {isTrue?(<>
          {commentList.map(({_id, name, picturePath, comments }, i) => (
            
              <Flexbetween key={i} >
                <Box width={'40px'} height={'40px'} m='10px'>
                  <img
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      width={'40px'}
                      height={'40px'}
                      alt="user"
                      src={`http://localhost:5001/assets/${picturePath}`}
                    />
                </Box>
                <Box backgroundColor={neutralLight}  width={'100%'} borderRadius={'5px'} onClick={() => navigate(`/profile/${_id}`) } >
                  <Typography color={main} variant="h5"  fontWeight="500" fontSize={'0.75rem'} sx={{ p:'4px 0 0 7px', "&:hover": {  cursor: "pointer"  }, }}>{name}</Typography>
                  <Typography sx={{p:'2px 0 1px 7px '}} color={medium} fontSize="1rem">{comments}</Typography>
                </Box>
                <IconButton onSubmit={() => submitComment() } >
                  <Delete />
                </IconButton>
                
              </Flexbetween>
            
          ))}
      

      <Flexbetween>
      <Box width={'40px'} height={'40px'} m='10px' >
                  <img
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      width={'40px'}
                      height={'40px'}
                      alt="user"
                      src={`http://localhost:5001/assets/${picturePath}`}
                    />
        </Box>

        <Flexbetween backgroundColor={neutralLight} width='100%' borderRadius='5px' gap='3rem' padding={'0.1rem 1rem'}>
          <InputBase width='100%' onChange={(e) => setComments(e.target.value)} value={comments} placeholder={`${firstName} ${lastName}`} />
          <IconButton disabled={!comments}  onClick={() => submitComment() } >
            <Send />
          </IconButton>
        </Flexbetween>

      </Flexbetween>
      </>
):<Typography >
  You are Not Freinds 
</Typography>}
      
      </Box>
    
  )

}

export default Comments;
