import { Route, Routes } from "react-router-dom";
import ArtistList from './components/ArtistList/ArtistList.tsx';
import AlbumsList from './components/AlbumsList/AlbumsList.tsx';
import TracksList from './components/TracksList/TracksList.tsx';
import NavBar from './components/UI/NavBar/NavBar.tsx';
import RegisterPage from './components/RegisterPage/RegisterPage.tsx';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import TrackHistory from './components/TrackHistory/TrackHistory.tsx';

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
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/track_history" element={<TrackHistory/>}/>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
