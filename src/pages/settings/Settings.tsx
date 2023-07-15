import React from 'react';
import { TextField } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import KeyIcon from '@mui/icons-material/Key';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Settings.module.css';
import UserSettings from './components/UserSettings/UserSettings';
import PasswordManagement from './components/PasswordManagement/PasswordManagement';
import { logoutWithGoogle } from '../../service/firebase';
import { setLogOut } from '../login/loginSlice';

const Settings = () => {
  const [showWizard, setShowWizard] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.settingsList} onClick={() => setShowWizard(1)}>
        <ManageAccountsIcon />
        <h2>User Settings</h2>
        <ChevronRightIcon className={styles.rightArrow} />
      </div>
      <div className={styles.settingsList} onClick={() => setShowWizard(2)}>
        <KeyIcon />
        <h2>Password Management</h2>
        <ChevronRightIcon className={styles.rightArrow} />
      </div>
      <div className={styles.settingsList} onClick={() => setShowWizard(3)}>
        <NotListedLocationIcon />
        <h2>Help</h2>
        <ChevronRightIcon className={styles.rightArrow} />
      </div>
      <div
        className={styles.settingsList}
        onClick={async () => {
          const isLoggedOut = await logoutWithGoogle();
          if (isLoggedOut) {
            dispatch(setLogOut());
            localStorage.clear();
            navigate('/');
          }
        }}
      >
        <LogoutIcon />
        <h2>Logout</h2>
      </div>

      <div className={styles.wizardContainer} data-show={Boolean(showWizard)}>
        {showWizard === 1 && <UserSettings setShowWizard={setShowWizard} />}
        {showWizard === 2 && (
          <PasswordManagement setShowWizard={setShowWizard} />
        )}
      </div>
    </div>
  );
};

export default Settings;
