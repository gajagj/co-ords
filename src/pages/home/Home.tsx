import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from './Home.module.css';
import MapView from './components/MapView';
import Dashboard from './components/Dashboard/Dashboard';

const Home = () => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  // });

  return (
    <div className={styles.container}>
      <div className={styles.dashboardContainer}>
        <Dashboard />
      </div>
      <div className={styles.mapContainer}>
        {/* {!isLoaded ? <h1>Loading...</h1> : <MapView />} */}
      </div>
    </div>
  );
};

export default Home;
