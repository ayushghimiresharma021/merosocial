import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import WidgetWrapper from "components/WidgetsWrapper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFriendship } from "state/state";


const FriendList = ({friends,isProfile}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends && friends.map(({_id,firstName,lastName,occupation,picturePath}) => (
          <Friend
            key={_id}
            friendId={_id}
            name={`${firstName} ${lastName}`}
            subtitle={occupation}
            userPicturePath={picturePath}
            isProfile={isProfile}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendList;