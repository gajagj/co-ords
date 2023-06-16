import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
