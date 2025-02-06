import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  deleteArtist,
  fetchArtists,
  publishArtist,
} from "../../store/thunks/artistThunk.ts";
import Grid from "@mui/material/Grid2";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Box,
  Chip,
} from "@mui/material";
import {
  selectArtists,
  selectArtistsLoading,
} from "../../store/slices/artistSlice.ts";
import { selectUser } from "../../store/slices/userSlice.ts";

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);
  const user = useAppSelector(selectUser);

  const filteredArtists = artists.filter((artist) => {
    if (!user) return artist.isPublished;

    if (user.role === "admin") return true;

    return artist.isPublished || artist.creator === user._id;
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleDelete = async (artistId: string) => {
    await dispatch(deleteArtist(artistId));
    await dispatch(fetchArtists());
  };

  const handlePublish = async (artistId: string) => {
    if (user?.role === "admin") {
      await dispatch(publishArtist(artistId));
      await dispatch(fetchArtists());
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: 300,
        }}
      >
        Artists
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {filteredArtists.map((artist) => (
          <Grid size={4} key={artist._id}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                to={`/artist/${artist._id}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={`http://localhost:8000/${artist.photo}`}
                  alt={artist.name}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  {!artist.isPublished && (
                    <Chip
                      label="Not Published"
                      color="error"
                      sx={{ alignSelf: "end" }}
                    />
                  )}
                  <Typography variant="h6" color="textPrimary" align="center">
                    {artist.name}
                  </Typography>
                </CardContent>
              </Link>

              <Box
                sx={{
                  alignSelf: "center",
                  marginBottom: 2,
                  display: "flex",
                  gap: 2,
                }}
              >
                {user?.role === "admin" && !artist.isPublished && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePublish(artist._id)}
                    disabled={loading}
                  >
                    Publish
                  </Button>
                )}
                {(user?.role === "admin" || user?._id === artist.creator) && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(artist._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtistList;
