import React, { useState } from "react";
import {
  Input,
  FormHelperText,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import styled from "@mui/styled-engine-sc";

const Form = styled("form")({
  width: "100%",
  maxWidth: "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const InputContainer = styled("div")({
  margin: "8px 0",
});

export default function JoinRoomForm() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    event.preventDefault();
    if (!roomCode) {
      setErrorMessage("Enter the room code");
    } else {
      axiosInstance
        .post(`api/join-room`, {
          code: roomCode,
        })
        .then((res) => {
          if (res.status == 200) {
            navigate(`/room/${roomCode}`);
          }
        })
        .catch((error) => {
          setErrorMessage("Room not found");
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <FormControl error={errorMessage}>
          <InputLabel htmlFor="code">Room Code</InputLabel>
          <Input
            id="code"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
            helperText={errorMessage}
          />
          {errorMessage && (
            <FormHelperText error>{errorMessage}</FormHelperText>
          )}
        </FormControl>
      </InputContainer>
      <Button variant="contained" color="primary" type="submit">
        Join Room
      </Button>
    </Form>
  );
}
