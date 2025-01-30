import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { getTrackToHistory } from '../../store/thunks/trackHistoryThunk.ts';
import {
  selectGetTrackHistoryLoading,
  selectTrackHistory
} from '../../store/slices/trackHistorySlice.ts';
import { CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';


const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectGetTrackHistoryLoading);

  useEffect(() => {
    dispatch(getTrackToHistory());
  }, [dispatch]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 300,
        mt: 3,
        mb: 3
      }}>
        Track history
      </Typography>

      <List>
        {trackHistory.map((history) => (
          <ListItem key={history._id} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={`${history.track.album.artist.name} - ${history.track.title} : ${history.track.duration}`}
              secondary={`Listened on: ${new Date(history.datetime).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TrackHistory;