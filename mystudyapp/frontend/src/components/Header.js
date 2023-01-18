import React from "react";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import styled from "@mui/styled-engine-sc";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFAF0",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const NavbarWrapper = styled("div")`
  background-color: #fafafa;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
const NavbarTitle = styled(Typography)`
  flex-grow: 1;
`;

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarWrapper>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <NavbarTitle variant="h6">MyStudyApp</NavbarTitle>
            <Button href="/" sx={{ color: "black" }}>
              Home
            </Button>
            <Button href="/register" sx={{ color: "black" }}>
              Register
            </Button>
            <Button sx={{ color: "black" }}>Login</Button>
          </Toolbar>
        </AppBar>
      </NavbarWrapper>
    </ThemeProvider>
  );
};

export default Navbar;
