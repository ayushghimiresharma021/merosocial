import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "scenes/homePage/Home";
import Login from "scenes/loginPage/Login";
import Profile from "./scenes/ProfilePage/Profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { themeSettings } from "theme";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

function App() {
  const mode = useSelector((state) => state.mode) ;
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]) ;


  return (
    <div className="App">
      <BrowserRouter>
       <ThemeProvider theme={theme} >
        <CssBaseline />
          <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
       </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
