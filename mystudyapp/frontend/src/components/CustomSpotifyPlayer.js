import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import SpotifyWebApi from "spotify-web-api-node";
import Song from "./Song";

export default function CustomSpotifyPlayer({ accessToken, setCurrentSong }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "802bd4983e2f4fe28ec8d601a97e9fa7",
  });
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const setSong = (song) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancelPrevRequest = false;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(search).then((res) => {
      if (cancelPrevRequest) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancelPrevRequest = true);
  }, [search, accessToken]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Grid>
      </Grid>
      {searchResults.map((track) => (
        <Song song={track} key={track.uri} setSong={setSong} />
      ))}
    </>
  );
}
