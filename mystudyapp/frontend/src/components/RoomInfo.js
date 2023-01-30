import React, { useState, useEffect } from "react";
import EditRoomForm from "./EditRoomForm";
import axiosInstance from "../axios";
import {
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
} from "@mui/material";

export default function RoomInfo({ room, setUpdateRooms }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteRoom = (event) => {
    event.preventDefault();
    axiosInstance.delete(`api/delete/${room.code}`).then((res) => {
      if (res.status == 204) {
        setOpenDelete(false);
        setUpdateRooms((prev) => !prev);
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item key={room.id} xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {room.name}
            </Typography>
            <Typography>Code: {room.code}</Typography>
            <Typography>Capacity: {room.capacity}</Typography>
            <Typography>Theme: {room.theme}</Typography>
          </CardContent>
          <CardActions>
            <Button href={`/room/${room.code}`} size="small">
              Join
            </Button>
            <Button size="small" onClick={handleClickOpen}>
              Edit
            </Button>
            <Button
              size="small"
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Room {room.code}</DialogTitle>
        <DialogContent>
          <EditRoomForm
            theRoom={room}
            setUpdateRooms={setUpdateRooms}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Are you sure you want to delete this room?</DialogTitle>
        <DialogContent>
          <Button variant="contained" color="secondary" onClick={deleteRoom}>
            Delete
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
