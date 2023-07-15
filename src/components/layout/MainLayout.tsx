import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MapView from '../MapView/MapView';

import styles from './Layout.module.css';

const MainLayout = ({ children }: { children: any }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.outletContainer}>{children}</div>
        <Footer />
      </div>
      <div className={styles.mapContainer}>
        {!isLoaded ? <h1>Loading...</h1> : <MapView />}
      </div>
    </div>
  );
};

export default MainLayout;
