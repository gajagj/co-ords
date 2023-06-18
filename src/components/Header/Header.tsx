import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { selectLoginDetails } from '../../pages/login/loginSlice';

import styles from './Header.module.css';
import { Avatar, Tooltip } from '@mui/material';

const Header = () => {
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
    </header>
  );
};

export default React.memo(Header);
