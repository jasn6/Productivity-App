import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

export default function Room(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { roomCode } = useParams();

  React.useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    return fetch("/api/get-room" + "?code=" + roomCode)
      .then((res) => {
        if (!res.ok) {
          navigate("/");
        }
        return res.json();
      })
      .then((data) => setData(data));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h4">Code: {roomCode}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">Theme: {data.theme}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">
          RoomName: {data.name != null ? data.name : ""}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">
          Capacity {data.capacity != null ? data.capacity : ""}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" href="/">
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
