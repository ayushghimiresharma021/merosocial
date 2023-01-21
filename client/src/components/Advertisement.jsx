import { Typography } from '@mui/material';
import React from 'react'
import Flexbetween from './Flexbox';
import WidgetWrapper from './WidgetsWrapper';
import {useTheme} from '@mui/material';


export default function Advertisement({image,description,title,website}) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  
  return (
    <WidgetWrapper>
        <Flexbetween>
            <Typography color={dark} variant="h5" fontWeight="500">Sponsored</Typography>
            <Typography color={medium}>Create Ad</Typography>
        </Flexbetween>
            <img width="100%" height="auto" alt="advert" style={{ borderRadius: "0.75rem", margin : "0.75rem 0" }} src={`http://localhost:5001/assets/${image}`}/>

            <Flexbetween>
                <Typography color={main} variant="h5" fontWeight="500">
                    {title}
                </Typography>
                <Typography color={medium}>
                    {website}
                </Typography>
            </Flexbetween>
            <Typography color={medium} m="0.5rem 0">
                {description}
            </Typography>
            
        
    </WidgetWrapper>
  )
}
