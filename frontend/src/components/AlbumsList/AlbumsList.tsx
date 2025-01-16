import { useEffect } from 'react';
import { Container, Card, CardContent, Typography, CardMedia, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchAlbums } from '../../store/thunks/albumThunk.ts';

const AlbumsList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { albums, loading } = useAppSelector((state) => state.albums);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {albums.length > 0 && (
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Albums by {albums[0].artist.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid size={6} key={album._id}>
            <Card>
              <CardMedia
                component="img"
                alt={album.title}
                height="300"
                image={`http://localhost:8000/${album.cover}`}
              />
              <CardContent>
                <Typography variant="h6">{album.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{mb: 2}}>
                  Year: {album.year}
                </Typography>
                <Link to={`/album/${album._id}`}>
                  <Button variant="contained" color="primary">
                    View Tracks
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AlbumsList;
