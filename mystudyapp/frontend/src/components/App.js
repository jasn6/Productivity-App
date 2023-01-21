import { Grid } from "@mui/material";
import React, { useState } from "react";
import { render } from "react-dom";
import Header from "./Header";
import HomePage from "./HomePage";

export default function App() {
  const [isLogin, setLogin] = useState(
    localStorage.getItem("access_token") != null
  );
  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Header isLogin={isLogin} />
      </Grid>
      <Grid item xs={12}>
        <HomePage isLogin={isLogin} setLogin={setLogin} />
      </Grid>
    </Grid>
  );
}
