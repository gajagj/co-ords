import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Tooltip } from '@mui/material';
import { selectLoginDetails, setLogOut } from '../../pages/login/loginSlice';
import { logoutWithGoogle } from '../../service/firebase';

import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetail = useSelector(selectLoginDetails);
  console.log(userDetail);

  return (
    <header className={styles.container}>
      <img src="public/logo.svg" alt="co-ords" width={100} />
      <Tooltip title={userDetail?.displayName}>
        <Avatar
          alt={userDetail?.displayName?.toUpperCase()}
          src={userDetail?.photoURL}
        >
          {userDetail?.displayName?.at(0)?.toUpperCase()}
        </Avatar>
      </Tooltip>
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
    </header>
  );
};

export default React.memo(Header);
