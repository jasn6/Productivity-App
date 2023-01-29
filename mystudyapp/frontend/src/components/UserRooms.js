import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import RoomInfo from "./RoomInfo";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import {
  Container,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
export default function UsersRooms() {
  const [updateRooms, setUpdateRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openJoinRoom, setOpenJoinRoom] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("api/myrooms")
      .then((res) => res.data)
      .then((data) => setRooms(data));
  }, [updateRooms]);

  if (!rooms.length) return <div>Loading...</div>;

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreateRoom(true)}
            >
              Create Room
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenJoinRoom(true)}
            >
              Join Room
            </Button>
          </Grid>
          {rooms.map((room) => (
            <RoomInfo room={room} setUpdateRooms={setUpdateRooms} />
          ))}
        </Grid>
      </Container>
      <Dialog open={openCreateRoom} onClose={() => setOpenCreateRoom(false)}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <CreateRoomForm
            setUpdateRooms={setUpdateRooms}
            handleClose={setOpenCreateRoom}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateRoom(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openJoinRoom} onClose={() => setOpenJoinRoom(false)}>
        <DialogTitle>Join Room</DialogTitle>
        <DialogContent>
          <JoinRoomForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJoinRoom(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
