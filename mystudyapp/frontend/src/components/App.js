import { Grid } from "@mui/material";
import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header";

export default function App() {
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <div>HOME PAGE</div>
      </Grid>
    </Grid>
  );
}
