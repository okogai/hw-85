import { useEffect } from 'react';
import { Container, Card, CardContent, Typography, CircularProgress, Button, Box, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteTrack, fetchTracks, publishTrack } from '../../store/thunks/trackThunk.ts';
import { addTrackToHistory } from '../../store/thunks/trackHistoryThunk.ts';
import { selectUser } from '../../store/slices/userSlice.ts';

const TracksList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
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

  const handleDelete = async (trackId: string) => {
    await dispatch(deleteTrack(trackId));
    if (id) {
      dispatch(fetchTracks(id));
    }
  };

  const handlePublish = async (trackId: string) => {
    if (user?.role === "admin") {
      await dispatch(publishTrack(trackId));
      if (id) {
        dispatch(fetchTracks(id));
      }
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
    <Container sx={{ mt: 4 }} maxWidth="lg">
      {tracks.length > 0 && (
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          {tracks[0].album.title} by {tracks[0].album.artist.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {tracks.map((track) => (
          <Grid size={12} key={track._id}>
            <Card>
              <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body1" sx={{flexGrow: 1}}>
                  {track.trackNumber}. {track.title} - {track.duration} min
                </Typography>
                {!track.isPublished && (
                  <Chip label="Not Published" color="error" sx={{marginRight: 20}}/>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlay(track._id, track.youtubeLink)}
                  sx={{marginRight: 2}}
                >
                  Play
                </Button>
                <Box sx={{alignSelf: 'center',display: 'flex', gap: 2}}>
                  {user?.role === 'admin' && !track.isPublished  && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePublish(track._id)}
                      disabled={loading}
                    >
                      Publish
                    </Button>
                  )}
                  {(user?.role === 'admin' || user?._id === track.creator) && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(track._id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TracksList;
