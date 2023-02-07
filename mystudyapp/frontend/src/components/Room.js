import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "@mui/styled-engine-sc";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { createClient } from "pexels";
import axiosInstance from "../axios";
import CustomSpotifyPlayer from "./CustomSpotifyPlayer";
import CurrentSong from "./CurrentSong";

var Themes = {
  winter: "vkphljq",
  sky: "xahwwl3",
  nature: "bi6uhtj",
  beach: "vmzq4k1",
  city: "u2qrglb",
};

let videoQualties;

export default function Room(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currBackground, setCurrBackground] = useState(0);
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [open, setOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const { roomCode } = useParams();

  const PlayerContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: 35,
    right: 35,
    cursor: "pointer",
    maxWidth: "350px",
    alignItems: "center",

    "& .hover-div": {
      opacity: 0,
      backgroundColor: "#4caf50",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      border: "none",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    "&:hover .hover-div": {
      opacity: 1,
    },
  });

  useEffect(() => {
    getRoomDetails();
  }, []);

  useEffect(() => {
    const client = createClient(
      "ZDTi3aaQbzp3ZPwbSmpMnyFQtgQO70IUKxhxBxtQbmEnubRDNOT7cXO3"
    );
    client.collections
      .media({ per_page: 15, id: Themes[data.theme] })
      .then((media) => {
        setBackgrounds(media.media);
        videoQualties = Array.from({ length: media.media.length }, () => null);
      });
  }, [data]);

  useEffect(() => {
    let cancelPrevRequest = false;
    if (backgrounds.length) {
      if (cancelPrevRequest) return;
      let i = videoQualties[currBackground];
      if (videoQualties[currBackground] == null) {
        i = 0;
        let currMax = 0;
        for (
          let n = 0;
          n < backgrounds[currBackground]["video_files"].length;
          n++
        ) {
          if (backgrounds[currBackground]["video_files"][n].width > currMax) {
            currMax = backgrounds[currBackground]["video_files"][n].width;
            i = n;
          }
        }
        videoQualties[currBackground] = i;
      }
      document.querySelector(".room-back").src =
        backgrounds[currBackground]["video_files"][i].link;
    }
    return () => (cancelPrevRequest = true);
  }, [backgrounds, currBackground]);

  useEffect(() => {
    axiosInstance
      .get("spotify/is-auth")
      .then((res) => res.data)
      .then((data) => {
        setSpotifyAuth(data.status);
        setAccessToken(data.accessToken);
      });
  }, []);

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

  const handleSpotify = () => {
    axiosInstance
      .get("spotify/get-auth-url")
      .then((res) => res.data)
      .then((data) => {
        window.location.replace(data.url);
      });
  };

  const SpotifyPlayerMemo = useMemo(
    () => (
      <PlayerContainer>
        <button onClick={() => setOpen(true)} className="hover-div">
          &#8593;
        </button>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          initialVolume={0.1}
          play={true}
          uris={currentSong?.uri}
        />
      </PlayerContainer>
    ),
    [accessToken, currentSong]
  );

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
        {!spotifyAuth ? (
          <Grid item xs={12} align="center">
            <Button variant="contained" onClick={handleSpotify}>
              Spotify
            </Button>
          </Grid>
        ) : (
          SpotifyPlayerMemo
        )}
      </Grid>
      <video autoPlay loop muted playsInline className="room-back">
        <source src={""} type="video/mp4" />
      </video>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "60vh",
            maxHeight: "60vh",
            minWidth: "70vh",
            maxWidth: "70vh",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Spotify Player</DialogTitle>
        <DialogContent>
          <CustomSpotifyPlayer
            accessToken={accessToken}
            setCurrentSong={setCurrentSong}
          />
        </DialogContent>
        <DialogActions>
          {currentSong && <CurrentSong song={currentSong} />}
        </DialogActions>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
