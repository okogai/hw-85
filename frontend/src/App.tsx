import { Route, Routes } from "react-router-dom";
import ArtistList from './components/ArtistList/ArtistList.tsx';
import AlbumsList from './components/AlbumsList/AlbumsList.tsx';
import TracksList from './components/TracksList/TracksList.tsx';
import NavBar from './components/NavBar/NavBar.tsx';

const App = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Routes>
        <Route path="/" element={<ArtistList/>}/>
        <Route path="/artist/:id" element={<AlbumsList/>}/>
        <Route path="/album/:id" element={<TracksList/>}/>
      </Routes>
    </>
  );
};

export default App;
