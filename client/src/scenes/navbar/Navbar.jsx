import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Lens,
} from "@mui/icons-material";
import { useSelector,useDispatch } from 'react-redux';
import { setIsProfile, setMode, setVisible } from 'state/state';
import { setLogout } from 'state/state';
import { useNavigate } from 'react-router-dom';
import Flexbetween from 'components/Flexbox';
import './Navbar.css' ;
import { setNotifications } from 'state/state';
import UserNotification from 'scenes/notifications/UserNotification';
import zIndex from '@mui/material/styles/zIndex';


function Navbar() {
  const [isMobileToggled,setIsMobileToggled] = useState(false)
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const inputElement = useRef()
  

  
  const {_id} = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.token) ;
  const isProfile = useSelector((state)=> state.isProfile) ;
  const mode01 = useSelector((state) => state.mode)
  const user = useSelector((state) => state.user)
  const notifications = useSelector((state) => state.notifications) ; 
  const isNonMobile = useMediaQuery("(min-width: 1000px)")

  



  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  var len = 0
  if(notifications){
     len  =  notifications.length
  }
  
  

  
  
  const [length,setlength] = useState(len)
  const chatButton = () => {
    navigate('/chat')
  }
  
  

  const notified = () => {

    console.log(inputElement.current.offsetTop)
    dispatch(setVisible())
    
  }


  const Notification  = async() =>{
    const response = await fetch(`http://localhost:5001/posts/notifications/${_id}`,{
      method:'GET',
      headers: {Authorization: `Bearer ${token}`}
    })
    const data  = await response.json()
    const {picturePath,firstName,lastName} = data
   
    dispatch(setNotifications({notifications:data}))
    
    
}



  
useEffect(() => {
  Notification() ;
},[])

  const fullName = `${user.firstName} ${user.lastName}` ;
  const profileChange = async() => {
    
    navigate('/home')
  }

  return (
    <Flexbetween position={'fixed'}  width={'1300px'} zIndex={'1'} top='0px' borderRadius={'3px'}  padding={'1rem 6%'} backgroundColor={alt}  >
      <Flexbetween gap={'1.75rem'} >
        <Typography 
          onClick={profileChange} 
           fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#0081C9"
            cursor="pointer"
            sx={{
              '& :hover ':{
                color : '#A0C3D2',
                cursor: 'pointer'
              }
            }}
         >Merosocial
        </Typography>
        {isNonMobile && 
          (<Flexbetween
          backgroundColor={neutralLight}
          borderRadius='9px'
          gap='3rem'
          padding={'0.1rem 1.5rem'}
        >
          <InputBase placeholder='Search...' />
          <IconButton>
            <Search />
          </IconButton>
        </Flexbetween>)
        }
      </Flexbetween>
      

      {/* Desktop */}
      {isNonMobile ? (
        <Flexbetween  gap={'1.75rem'} >
          <IconButton onClick={() => dispatch(setMode())} >
            {mode01=='dark' ?
             <DarkMode  sx={{fontSize:'25px'}} /> :
             <LightMode sx={{fontSize:'25px'}} />
            }
          </IconButton>
          <IconButton onClick={chatButton}>
            <Message  sx={{fontSize:'25px'}} />
          </IconButton>
          <IconButton ref={inputElement} onClick={notified} style={{display:'inline-block',position:'relative',zIndex:'0'}}>
            <Notifications  sx={{fontSize:'25px'}} />
            {len!=0 &&
           <span style={{position:'absolute',top:'-5px',right:'-5px',padding: '1px 6px', backgroundColor:'red',color:'white',borderRadius:'50%'}}>{length}</span> }
          </IconButton>
          
          <Help          sx={{fontSize:'25px'}} />
          <FormControl variant='standard' value={fullName} >
          <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}>
              <MenuItem value={fullName} ><Typography>{fullName}</Typography></MenuItem>
              <MenuItem onClick={() =>{ dispatch(setLogout()); navigate('/') }} >Log out</MenuItem>
            </Select>
          </FormControl>
        </Flexbetween>
      ):(
        <IconButton onClick={() => setIsMobileToggled(!isMobileToggled) }>
          <Menu /> 
        </IconButton>)

      }

      {/* Mobile Items */}
      {!isNonMobile && isMobileToggled &&(
        <Box
        position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          >
        {/* close icons */}
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            padding='1.5rem'
          >
            <IconButton onClick={() => setIsMobileToggled(!isMobileToggled) }>
              <Close />
            </IconButton>
          </Box>
          <Flexbetween 
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap='3rem'
           >
            <IconButton onClick={() => dispatch(setMode) }>
              {theme.palette.mode === 'dark'? 
              <DarkMode  sx={{fontSize:'25px' }} /> :
              <LightMode sx={{fontSize:'25px',color:{dark}}}/>}
            </IconButton>
            <Message       sx={{fontSize:'25px'}} />


            <IconButton className='notification'>
              <Notifications sx={{fontSize:'25px'}} />
              
            </IconButton>
            <Help          sx={{fontSize:'25px'}} />
            <FormControl variant='standard' value={fullName} >
            <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >

                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout)}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Flexbetween>
        </Box>
      )}



    </Flexbetween>
  )
}

export default Navbar
