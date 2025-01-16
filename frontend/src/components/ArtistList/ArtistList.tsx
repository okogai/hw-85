import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchArtists } from '../../store/thunks/artistThunk.ts';
import { RootState } from '../../app/store.ts';
import Grid from '@mui/material/Grid2';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from '@mui/material';

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const { artists, loading } = useAppSelector((state: RootState) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom  style={{textAlign: 'center' }}>
        Artists
      </Typography>
      <Grid container spacing={3}>
        {artists.map((artist) => (
          <Grid size={6} key={artist._id}>
            <Card>
              <Link to={`/artists/${artist._id}`} style={{ textDecoration: 'none', textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`http://localhost:8000/${artist.photo}`}
                  alt={artist.name}
                />
                <CardContent>
                  <Typography variant="h6" color="textPrimary">
                    {artist.name}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtistList;
