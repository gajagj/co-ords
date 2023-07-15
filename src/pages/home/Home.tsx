import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginDetails } from '../login/loginSlice';
import { getDocumentByDocId } from '../../service/firebase';
import styles from './Home.module.css';

const Home = () => {
  const userLoginDetails = useSelector(selectLoginDetails);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getData() {
      const data = await getDocumentByDocId(userLoginDetails.docId);
      setUser(data);
    }
    getData();
  }, []);
  return (
    <div className={styles.home__container}>
      <h1 className={styles.home__header}>My Request</h1>
      <div className={styles.home__content}>
        {user?.requestingTo?.map((r: any, index: number) => {
          return (
            <div
              key={`user_${index}_${Math.random()}`}
              className={styles.home__card}
            >
              <p>{r.requestedUser}</p>
              <p>{r.status}</p>
            </div>
          );
        })}
      </div>
      <h1 className={styles.home__header}>Other Request</h1>
      <div className={styles.home__content}>
        {user?.requestedFrom?.map((r: any, index: number) => {
          return (
            <div
              key={`user_${index}_${Math.random()}`}
              className={styles.home__card}
            >
              <p>{r.requestedUser}</p>
              <p>{r.status}</p>
              <p>✔️</p>
              <p>✖️</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
