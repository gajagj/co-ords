import { GoogleMap, Marker, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import styles from './MapView.module.css';

const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };
  const successFn = (position) => {
    console.log(position);
    setUserLocation(position.coords);
  };
  const errorFn = (err) => {
    console.log(err);
  };
  useEffect(() => {
    const geoLocationWatchId = navigator.geolocation.watchPosition(
      successFn,
      errorFn,
      options,
    );
    return () => {
      navigator.geolocation.clearWatch(geoLocationWatchId);
    };
  }, []);

  const userPosition = useMemo(() => {
    if (userLocation)
      return { lat: userLocation.latitude, lng: userLocation.longitude };

    return { lat: 11.1149056, lng: 77.3390336 };
  }, [userLocation]);
  return (
    <GoogleMap
      mapContainerClassName={styles.container}
      center={userPosition}
      zoom={12}
    >
      <MarkerF position={userPosition} />
    </GoogleMap>
  );
};

export default MapView;
