import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { createMuiTheme, ThemeProvider, Typography } from "@mui/material";
import styled from "@mui/styled-engine-sc";
import { TextField, Button, Grid } from "@mui/material";
import { Lock, Person } from "@mui/icons-material";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const Wrapper = styled("div")`
  padding: 2rem;
`;

export default function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLogin(true);
    axiosInstance
      .post(`api/token`, {
        user_name: username,
        password: password,
      })
      .then((res) => {
        //Grab Tokens returned from endpoint
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12} align="center">
              <Person />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                InputProps={{
                  startAdornment: <Person fontSize="small" color="primary" />,
                }}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                InputProps={{
                  startAdornment: <Lock fontSize="small" color="primary" />,
                }}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </ThemeProvider>
  );
}
