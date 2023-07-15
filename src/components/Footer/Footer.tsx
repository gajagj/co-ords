import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Footer.module.css';

const navItems = [
  {
    icon: <HomeIcon />,
    className: styles.footerItem,
    link: '/home',
  },
  {
    icon: <AddIcon />,
    className: `${styles.footerItem}`,
    link: '/add',
  },
  {
    icon: <SettingsIcon />,
    className: styles.footerItem,
    link: '/settings',
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(null);

  useEffect(() => {
    if (active === null) {
      const path = window.location.pathname;
      const index = navItems.findIndex((item) => item.link === path);
      setActive(index);
    }
  }, []);

  return (
    <footer className={styles.container}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`${item.className} ${
            index === active ? styles.active : ''
          }`}
          onClick={() => {
            setActive(index);
            navigate(item.link);
          }}
        >
          {item.icon}
        </div>
      ))}
    </footer>
  );
};

export default React.memo(Footer);
