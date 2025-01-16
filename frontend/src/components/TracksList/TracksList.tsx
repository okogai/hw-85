import { useEffect } from 'react';
import { Container, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracks } from '../../store/thunks/trackThunk.ts';

const TracksList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container  sx={{ mt: 4 }}>
      {tracks.length > 0 && (
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          {tracks[0].album.title} by {tracks[0].album.artist.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {tracks.map((track) => (
          <Grid size={12} key={track._id}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  {track.trackNumber}. {track.title} - {track.duration} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TracksList;
