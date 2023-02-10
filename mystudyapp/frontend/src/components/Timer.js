import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  ButtonBase,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
const InputLine = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "& .time": {
    position: "absolute",
    left: 20,
  },

  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
});

export default function Timer() {
  const [time, setTime] = useState("25:00");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isRunning || (minutes === 0 && seconds === 0)) {
      return;
    }
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          setIsRunning(false);
          return;
        }
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    if (editing) {
      let parts = time.split(":");
      setMinutes(parseInt(parts[0]));
      setSeconds(parseInt(parts[1]));
      setEditing(false);
    }

    setIsRunning(true);
  };

  const handleReset = () => {
    let parts = time.split(":");
    setMinutes(parseInt(parts[0]));
    setSeconds(parseInt(parts[1]));

    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleInputChange = (event) => {
    setInput("");
    let parts = time.split(":");
    let hour = parts[0];
    let minute = parts[1];
    hour = (hour + minute[0]).slice(-2);
    minute = (minute + event.target.value).slice(-2);
    let newString = hour + ":" + minute;
    setTime(newString);
  };

  const handleDeletion = (event) => {
    if (event.key === "Backspace") {
      let parts = time.split(":");
      let hour = parts[0];
      let minute = parts[1];
      minute = (hour[1] + minute).slice(0, -1);
      hour = ("0" + hour).slice(0, -1);
      let newString = hour + ":" + minute;
      setTime(newString);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 200,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} alignItems="center">
          <Typography>Pomodoro</Typography>
        </Grid>
        <Grid item alignItems="center" xs={8}>
          {editing ? (
            <InputLine>
              <Typography className="time">
                <Box sx={{ letterSpacing: 6, m: 1 }}>{time}</Box>
              </Typography>
              <TextField
                variant="standard"
                onChange={handleInputChange}
                onKeyDown={handleDeletion}
                type="number"
                value={input}
              />
            </InputLine>
          ) : (
            <Typography
              onClick={() => {
                setEditing(true);
                setIsRunning(false);
              }}
              cursor="pointer"
            >
              <Box sx={{ letterSpacing: 6, m: 1 }}>
                {`${minutes < 10 ? "0" + minutes : minutes}m ${
                  seconds < 10 ? "0" + seconds : seconds
                }s`}{" "}
              </Box>
            </Typography>
          )}
        </Grid>
        {isRunning ? (
          <Grid item alignItems="center" onClick={handleStop} cursor="pointer">
            <ButtonBase xs={2} sx={{ width: 20, height: "100%" }}>
              <PauseIcon />
            </ButtonBase>
          </Grid>
        ) : (
          <Grid item alignItems="center" onClick={handleStart} cursor="pointer">
            <ButtonBase xs={2} sx={{ width: 20, height: "100%" }}>
              <PlayArrowIcon />
            </ButtonBase>
          </Grid>
        )}

        <Grid item alignItems="center" onClick={handleReset} cursor="pointer">
          <ButtonBase xs={2} sx={{ width: 20, height: "100%" }}>
            <ReplayIcon />
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
}
