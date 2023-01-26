import React, { useState, useEffect } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Logout from "./Logout";
import CreateRoom from "./CreateRoom";
import UsersRooms from "./UserRooms";
import Room from "./Room";
import JoinRoom from "./JoinRoom";
import axiosInstance from "../axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

const renderHomePage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3">MyStudyApp</Typography>
      </Grid>
      <Grid xs={12} item align="center">
        <Button variant="contained" to="/join" component={Link}>
          Join a Room
        </Button>
        <Button href="/create-room">Create a Room</Button>
      </Grid>
    </Grid>
  );
};

export default function HomePage({ isLogin, setLogin }) {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLogin ? <Navigate to={"/rooms"} replace /> : renderHomePage()
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setLogin={setLogin} />} />
        <Route path="/logout" element={<Logout setLogin={setLogin} />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/rooms" element={<UsersRooms />} />
        <Route path="/room/:roomCode" element={<Room />} />
        <Route path="/join-room" element={<JoinRoom />} />
      </Routes>
    </Router>
  );
}
