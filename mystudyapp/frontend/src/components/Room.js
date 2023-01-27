import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { createClient } from "pexels";
import axiosInstance from "../axios";

export default function Room(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currBackground, setCurrBackground] = useState(0);
  const { roomCode } = useParams();

  React.useEffect(() => {
    getRoomDetails();
    const client = createClient(
      "ZDTi3aaQbzp3ZPwbSmpMnyFQtgQO70IUKxhxBxtQbmEnubRDNOT7cXO3"
    );
    client.collections.media({ per_page: 15, id: "u2qrglb" }).then((media) => {
      setBackgrounds(media.media);
    });
  }, []);

  React.useEffect(() => {
    if (backgrounds.length) {
      document.querySelector(".room-back").src =
        backgrounds[currBackground]["video_files"][0].link;
    }
  }, [currBackground]);

  const getRoomDetails = () => {
    return axiosInstance
      .get(`api/get-room?code=${roomCode}`)
      .then((res) => {
        if (res.status != 200) {
          navigate("/");
        }
        return res.data;
      })
      .then((data) => setData(data));
  };

  const getNextBack = (event) => {
    event.preventDefault();
    setCurrBackground((prev) => prev + 1);
  };

  const getPrevBack = (event) => {
    event.preventDefault();
    setCurrBackground((prev) => prev - 1);
  };

  if (!backgrounds.length) return <div>Loading...</div>;

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
        <Grid item xs={12} align="center">
          {currBackground > 0 && (
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={getPrevBack}
            >
              &#9664;
            </Button>
          )}
          {currBackground < backgrounds.length - 1 && (
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={getNextBack}
            >
              &#9654;
            </Button>
          )}
        </Grid>
      </Grid>
      <video autoPlay loop muted playsInline className="room-back">
        <source
          src={backgrounds[currBackground]["video_files"][0].link}
          type="video/mp4"
        />
      </video>
    </>
  );
}
