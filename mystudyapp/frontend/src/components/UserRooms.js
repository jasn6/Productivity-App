import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { TextField, Button, Grid, Typography } from "@mui/material";
export default function UsersRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("api/myrooms")
      .then((res) => res.data)
      .then((data) => setRooms(data));
  }, []);

  if (!rooms.length) return <div>Loading...</div>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button href="/create-room">Create Room</Button>
        </Grid>
        {rooms.map((room) => (
          <Grid item xs={12} align="center">
            <Typography key={room.id} variant="h3">
              {room.code}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
