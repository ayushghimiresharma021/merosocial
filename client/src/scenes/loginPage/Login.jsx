import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import {Typography} from '@mui/material'
import Form from './Form'

function Login() {
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width:1000px')
  return (
    <Box>
        <Box width={'100%'} textAlign='center' backgroundColor={theme.palette.background.alt} p='1rem 6%' >
        <Typography 
           fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#658864"
         >Merosocial
        </Typography>
        </Box>
        <Box 
          width={isNonMobile ? '50%' : '93%'}
          padding='2rem'
          borderRadius={'1.5rem'}
          margin='1.5rem auto'
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight={'600'} variant='h5' sx={{mb:'1.5rem'}} alignItems='center' >
            Welcome to Merosocial, the Social Media for Everybody
          </Typography>
          <Form />
        </Box>

    </Box>
  )
}

export default Login
