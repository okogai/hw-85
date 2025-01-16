import { Route, Routes } from "react-router-dom";
import ArtistList from './components/ArtistList/ArtistList.tsx';
import AlbumsList from './components/AlbumsList/AlbumsList.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtistList/>} />
        <Route path="/artist/:id" element={<AlbumsList />} />
        <Route path="/album/:id" element={<AlbumsList />} />
      </Routes>
    </>
  );
};

export default App;
