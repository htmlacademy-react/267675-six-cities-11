import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../consts';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';


type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main placeCardCount={placeCardCount} ></Main>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<Favorites />}
        />
        <Route
          path={AppRoute.Room}
          element={<Room />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
