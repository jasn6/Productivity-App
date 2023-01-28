import React, { useState } from "react";
import {
  Input,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import styled from "@mui/styled-engine-sc";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

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

export default function CreateRoomForm({ setUpdateRooms, handleClose }) {
  const [capacity, setCapacity] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!capacity || !theme || !name) {
      setError(true);
    } else {
      setError(false);
    }
    axiosInstance
      .post("api/create-room", {
        name: name,
        capacity: capacity,
        theme: theme,
      })
      .then((res) => {
        if (res.status == 200 && error) {
          setUpdateRooms((prev) => !prev);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Creation Failed");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <FormControl error={error}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {error && <FormHelperText error>Enter the room name</FormHelperText>}
        </FormControl>
      </InputContainer>
      <InputContainer>
        <FormControl error={error}>
          <InputLabel htmlFor="capacity">Capacity</InputLabel>
          <Input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
          {error && (
            <FormHelperText error>Enter the room capacity</FormHelperText>
          )}
        </FormControl>
      </InputContainer>
      <InputContainer>
        <FormControl error={error}>
          <InputLabel id="theme-select">Theme</InputLabel>
          <Select
            id="theme"
            labelId="theme-select"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            autoWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="winter">Winter</MenuItem>
            <MenuItem value="cafe">Cafe</MenuItem>
            <MenuItem value="summer">Summer</MenuItem>
            <MenuItem value="library">Library</MenuItem>
          </Select>
          {error && (
            <FormHelperText error>Select the room theme</FormHelperText>
          )}
        </FormControl>
      </InputContainer>
      <Button variant="contained" color="primary" type="submit">
        Create Room
      </Button>
    </Form>
  );
}
