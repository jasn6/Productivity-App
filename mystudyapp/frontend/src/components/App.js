import { Grid } from "@mui/material";
import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header";
import HomePage from "./HomePage";

export default function App() {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <HomePage />
      </Grid>
    </Grid>
  );
}
