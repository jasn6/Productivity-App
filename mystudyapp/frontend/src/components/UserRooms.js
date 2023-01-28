import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import RoomInfo from "./RoomInfo";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
export default function UsersRooms() {
  const [updateRooms, setUpdateRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("api/myrooms")
      .then((res) => res.data)
      .then((data) => setRooms(data));
  }, [updateRooms]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!rooms.length) return <div>Loading...</div>;

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" href="/create-room">
              Create Room
            </Button>
            <Button variant="contained" color="secondary" href="/join-room">
              Join Room
            </Button>
          </Grid>
          {rooms.map((room) => (
            <RoomInfo
              room={room}
              updateRooms={updateRooms}
              setUpdateRooms={setUpdateRooms}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}
