import { Route, Routes } from "react-router-dom";
import ArtistList from './components/ArtistList/ArtistList.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtistList/>} />
      </Routes>
    </>
  );
};

export default App;
