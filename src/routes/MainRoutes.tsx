import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Authorize from '../components/Authorize';
import Home from '../pages/home/Home';
import Settings from '../pages/settings/Settings';
import ProtectedRoute from './ProtectedRoute';
import PreventedRoute from './PreventedRoute';
import MainLayout from '../components/layout/MainLayout';
import MiniLayout from '../components/layout/MiniLayout';

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* unprotected routes can be added here */}
        <Route
          path="/"
          index
          element={<PreventedRoute layout={MiniLayout} component={Login} />}
        />
        <Route
          path="/login"
          index
          element={<PreventedRoute layout={MiniLayout} component={Login} />}
        />

        {/* protected routes can be added here inside Authorize */}
        <Route
          path="/home"
          element={<ProtectedRoute layout={MainLayout} component={Home} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute layout={MainLayout} component={Settings} />}
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
