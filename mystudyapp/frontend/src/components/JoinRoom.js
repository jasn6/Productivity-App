import React, { Component, useState } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleRoomCode = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    axiosInstance
      .post(`api/join-room`, {
        code: roomCode,
      })
      .then((res) => {
        if (res.status == 200) {
          navigate(`/room/${roomCode}`);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Room not found");
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4">Join a Room</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={errorMessage}
          helperText={errorMessage}
          label="Code"
          variant="outlined"
          placeholder="Enter a Room Code"
          onChange={handleRoomCode}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button to="/" component={Link} variant="contained" color="secondary">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
