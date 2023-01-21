import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";

import Flexbetween from "components/Flexbox";
import WidgetWrapper from "components/WidgetsWrapper";
import UserImage from "components/Userimage";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({isProfile, userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const friendsCount = useSelector((state) => state.friendship);
    const isProfileOrHome = useSelector((state) => state.isProfileOrHome) 


    const getUser = async () => {
        const response = await fetch(`http://localhost:5001/user/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setUser(data)
    };
    useEffect(() => {
        getUser()
        console.log(user) ;
    }, [],)
  

    if (!user) {
        return null;
      }
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;
    
    return (
        <WidgetWrapper position={isProfileOrHome==='profile'?'static':'fixed'} >
            <Flexbetween gap='0.5rem' pb={'1.1rem'} onClick={() => navigate(`/profile/${userId}`)} >
                <Flexbetween gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friendsCount.length} friends</Typography>
                    </Box>
                </Flexbetween>
                <ManageAccountsOutlined />
            </Flexbetween>


            <Divider />

            <Box p='1rem 0'>
                <Box display={'flex'} alignItems='center' gap={'1rem'} mb='0.5rem' >
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium} >{location}</Typography>
                </Box>
                <Box display={'flex'} alignItems='center' gap={'1rem'}>
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium} >{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* row- 3 */}
            <Box p='1rem 0'  >
                <Flexbetween>
                    <Typography color={medium} >Who's Viewed Your Profile </Typography>
                    <Typography color={main} fontWeight='500' >{viewedProfile? viewedProfile: 0}</Typography>
                </Flexbetween>
                <Flexbetween>
                    <Typography color={medium} >Impression of Your Post  </Typography>
                    <Typography color={main} fontWeight='500' >{impressions?impressions: 0}</Typography>
                </Flexbetween>
            </Box>
            <Divider />

            {/* row -4 */}
            <Box p='1rem 0' >
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>
                <Flexbetween gap="1rem" mb="0.5rem">
                    <Flexbetween gap="1rem">
                        <Twitter />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </Flexbetween>
                    <EditOutlined sx={{ color: main }} />
                </Flexbetween>

                <Flexbetween gap="1rem">
                    <Flexbetween gap="1rem">
                        <LinkedIn />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </Flexbetween>
                    <EditOutlined sx={{ color: main }} />
                </Flexbetween>

            </Box>

        </WidgetWrapper>
    )




}

export default UserWidget