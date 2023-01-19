import React, { useState, useEffect } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

const renderHomePage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3">MyStudyApp</Typography>
      </Grid>
      <Grid xs={12} item align="center">
        <Button variant="contained" to="/join" component={Link}>
          Join a Room
        </Button>
        <Button
          variant="contained"
          color="secondary"
          to="/create"
          component={Link}
        >
          Create a Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={renderHomePage()} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
