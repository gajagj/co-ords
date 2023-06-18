import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import Authorize from '../components/Authorize';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* unprotected routes can be added here */}
        <Route path="/" index element={<Login />} />
        <Route path="/login" index element={<Login />} />

        {/* protected routes can be added here inside Authorize */}
        <Route path="home" element={<Authorize Comp={<Home />} />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
