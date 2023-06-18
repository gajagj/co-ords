import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Settings from '../pages/settings/Settings';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
