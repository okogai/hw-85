import { useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteAlbum, fetchAlbums, publishAlbum } from '../../store/thunks/albumThunk.ts';
import { selectUser } from '../../store/slices/userSlice.ts';
import { selectAlbums, selectAlbumsLoading } from '../../store/slices/albumSlice.ts';

const AlbumsList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  const handleDelete = async (artistId: string) => {
    await dispatch(deleteAlbum(artistId));
    if (id) {
      await dispatch(fetchAlbums(id));
    }
  };

  const handlePublish = async (artistId: string) => {
    if (user?.role === "admin") {
      await dispatch(publishAlbum(artistId));
      if (id) {
        await dispatch(fetchAlbums(id));
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
    <Container sx={{ mt: 4 }}>
      {albums.length > 0 && (
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Albums by {albums[0].artist.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid size={6} key={album._id}>
            <Card  sx={{ position: 'relative'}}>
              <CardMedia
                component="img"
                alt={album.title}
                height="300"
                image={`http://localhost:8000/${album.cover}`}
              />
              <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                {!album.isPublished && (
                  <Chip label="Not Published" color="error" sx={{alignSelf: 'end'}}/>
                )}
                <Typography variant="h6" sx={{mb: 2}}>{album.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
                  Year: {album.year}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Track Count: {album.trackCount}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Link to={`/album/${album._id}`}>
                    <Button variant="contained" color="primary">
                      View Tracks
                    </Button>
                  </Link>
                  <Box sx={{alignSelf: 'center', marginBottom: 2,display: 'flex', gap: 2}}>
                    {user?.role === 'admin' && !album.isPublished  && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handlePublish(album._id)}
                        disabled={loading}
                      >
                        Publish
                      </Button>
                    )}
                    {(user?.role === 'admin' || user?._id === album.creator) && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(album._id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AlbumsList;
