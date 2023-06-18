import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthorizeProps {
  Comp?: any;
}

const Authorize = ({ Comp }: AuthorizeProps) => {
  const location = useLocation();
  const isLogin = localStorage.getItem('isUserLoggedIn');
  console.log('above if', isLogin !== 'true');
  if (isLogin !== 'true') {
    console.log('redirected inside if');
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  console.log('below if');

  return Comp;
};

export default Authorize;
