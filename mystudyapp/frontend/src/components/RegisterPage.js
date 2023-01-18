import React, { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import styled from "@mui/styled-engine-sc";
import { TextField, Button, Grid, Typography, Icon } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

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

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data before submitting
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    // Submit the form data to the server
    axiosInstance
      .post("users/register", {
        user_name: username,
        password: password,
      })
      .then((res) => {
        navigate("/");
        console.log(username);
        console.log(password);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12} align="center">
              <Icon fontSize="large">
                <PersonAdd />
              </Icon>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h4" align="center" gutterBottom>
                Sign Up
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
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
              />
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button type="submit" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Registration;
