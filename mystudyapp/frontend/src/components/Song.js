import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Song({ song, chooseSong }) {
  function handlePlay() {
    chooseSong(song);
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        cursor: "pointer",
      }}
    >
      <Grid container spacing={2}>
        <Grid item alignItems="center">
          <ButtonBase sx={{ width: 64, height: "100%" }}>
            <Img alt="complex" src={song.albumUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container alignItems="center">
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            justifyContent="center"
          >
            <Grid item xs justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {song.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {song.artist}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
