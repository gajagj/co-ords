import React from 'react';
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

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
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
      </div>
    </footer>
  );
};

export default React.memo(Footer);
