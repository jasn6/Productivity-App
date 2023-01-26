import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
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
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} align="center">
            <Button href="/create-room">Create Room</Button>
          </Grid>
          {rooms.map((room) => (
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
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
