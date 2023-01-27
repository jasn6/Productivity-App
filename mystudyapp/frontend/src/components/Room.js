import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { createClient } from "pexels";

export default function Room(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { roomCode } = useParams();

  React.useEffect(() => {
    getRoomDetails();
    const client = createClient(
      "ZDTi3aaQbzp3ZPwbSmpMnyFQtgQO70IUKxhxBxtQbmEnubRDNOT7cXO3"
    );
    client.collections.media({ per_page: 1, id: "u2qrglb" }).then((media) => {
      console.log(media);
    });
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
    <>
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
      <video autoPlay loop muted playsInline className="room-back">
        <source
          src="https://player.vimeo.com/external/269971860.hd.mp4?s=eae965838585cc8342bb5d5253d06a52b2415570&profile_id=174&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>
    </>
  );
}
