import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CurrentSong({ song }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "10px",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#9fd3c7",
        cursor: "pointer",
      }}
    >
      <Grid container spacing={2} alignItems="center">
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
              <Typography gutterBottom variant="subtitle2" component="div">
                {song.title}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {song.artist}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
