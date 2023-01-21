import React, { useState } from 'react'
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
} from "@mui/icons-material";
import { useSelector,useDispatch } from 'react-redux';
import { setIsProfile, setMode } from 'state/state';
import { setLogout } from 'state/state';
import { useNavigate } from 'react-router-dom';
import Flexbetween from 'components/Flexbox';


function Navbar() {
  const [isMobileToggled,setIsMobileToggled] = useState(false)
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const isProfile = useSelector((state)=> state.isProfile) ;

  const mode01 = useSelector((state) => state.mode)
  console.log(mode01)
  const user = useSelector((state) => state.user)
  const isNonMobile = useMediaQuery("(min-width: 1000px)") 

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}` ;
  const profileChange = async() => {
    
    navigate('/home')
  }

  return (
    <Flexbetween padding={'1rem 6%'} backgroundColor={alt} >
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
        <Flexbetween gap={'1.75rem'} >
          <IconButton onClick={() => dispatch(setMode())} >
            {mode01=='dark' ?
             <DarkMode  sx={{fontSize:'25px'}} /> :
             <LightMode sx={{fontSize:'25px'}} />
            }
          </IconButton>
          <Message       sx={{fontSize:'25px'}} />
          <Notifications sx={{fontSize:'25px'}} />
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
            <Notifications sx={{fontSize:'25px'}} />
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
