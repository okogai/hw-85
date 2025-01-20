import { useEffect } from 'react';
import { Container, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracks } from '../../store/thunks/trackThunk.ts';
import { addTrackToHistory } from '../../store/thunks/trackHistoryThunk.ts';

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

  const openInPopup = (youtubeLink: string) => {
    const width = 800;
    const height = 600;

    window.open(
      youtubeLink,
      'YouTubePopup',
      `width=${width},height=${height},resizable=yes,scrollbars=yes`
    );
  };

  const handlePlay = (trackId: string, youtubeLink?: string) => {
    dispatch(addTrackToHistory(trackId));
    if (youtubeLink) {
      openInPopup(youtubeLink);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      {tracks.length > 0 && (
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          {tracks[0].album.title} by {tracks[0].album.artist.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {tracks.map((track) => (
          <Grid size={12} key={track._id}>
            <Card>
              <CardContent sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Typography variant="body1">
                  {track.trackNumber}. {track.title} - {track.duration} min
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlay(track._id, track.youtubeLink)}
                >
                  Play
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TracksList;
