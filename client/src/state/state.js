import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  advertisement : null,
  userFriends:[],
  friendship: [],
  isProfileOrHome:'home',
  notifications:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userFriends = state.user.friends ;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserFriends: (state, action) => {
      state.userFriends = action.payload.userFriends ;
    },
    setFriendship : (state,action) => {
      if (state.friendship) {
        state.friendship = action.payload.friendship;
      }
      else {
        console.error("user friends non-existent :(");
      }

    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setAdvertisement: (state,action) => {
      state.advertisement = action.payload.advertisement;
    },
    setIsProfileOrHome : (state,action) => {
      state.isProfileOrHome = action.payload.isProfileOrHome;
    },
    setNotifications: (state,actions) => {
      state.notifications =  actions.payload.notifications
    }
  },
});

export const { setMode, setLogin, setLogout, setUserFriends, setPosts, setPost,setAdvertisement,setFriendship,setIsProfileOrHome,setNotifications} =
  authSlice.actions;
export default authSlice.reducer;