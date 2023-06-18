import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutWithGoogle } from '../service/firebase';
import { selectLoginDetails, setLogOut } from './login/loginSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetail = useSelector(selectLoginDetails);
  console.log('Home Component');
  return (
    <>
      <h1>
        Hey {userDetail.displayName} Welcome to Home...You are logged in
        successfully
      </h1>
      <button
        onClick={async () => {
          const isLoggedOut = await logoutWithGoogle();
          if (isLoggedOut) {
            dispatch(setLogOut());
            localStorage.clear();
            navigate('/');
          }
        }}
        type="button"
      >
        Logout
      </button>
    </>
  );
};

export default Home;
