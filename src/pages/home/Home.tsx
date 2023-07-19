import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from '@firebase/firestore';
import { selectLoginDetails } from '../login/loginSlice';
import { db, getDocumentByDocId } from '../../service/firebase';
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

  const handleApproveRequest = async (docId: string) => {
    // get the dcoument of current user to update requestedfrom array
    const currentUser = await getDocumentByDocId(userLoginDetails.docId);

    const data = currentUser.requestedFrom;
    const updatedData = data.map((d: any) => {
      if (d.docId === docId) {
        return { ...d, status: 'approved' };
      }
      return d;
    });
    const currentRef = doc(db, 'users', userLoginDetails.docId);
    // below is an async call to update our collection and nothing will be returned
    const temp = await updateDoc(currentRef, {
      requestedFrom: updatedData,
    });

    // get the dcoument of friend user to update requestedto array
    const friendUser = await getDocumentByDocId(docId);
    const data1 = friendUser.requestingTo;
    const updatedData1 = data1.map((d: any) => {
      if (d.docId === userLoginDetails.docId) {
        return { ...d, status: 'approved' };
      }
      return d;
    });
    const friendRef = doc(db, 'users', userLoginDetails.docId);
    // below is an async call to update our collection and nothing will be returned
    const tempFriend = await updateDoc(friendRef, {
      requestingTo: updatedData1,
    });
  };

  const handleDeclineRequest = async (docId: string) => {
    // get the dcoument of current user to update requestedfrom array
    const currentUser = await getDocumentByDocId(userLoginDetails.docId);

    const data = currentUser.requestedFrom;
    const updatedData = data.map((d: any) => {
      if (d.docId === docId) {
        return { ...d, status: 'declined' };
      }
      return d;
    });
    const currentRef = doc(db, 'users', userLoginDetails.docId);
    // below is an async call to update our collection and nothing will be returned
    const temp = await updateDoc(currentRef, {
      requestedFrom: updatedData,
    });

    // get the dcoument of friend user to update requestedto array
    const friendUser = await getDocumentByDocId(docId);
    const data1 = friendUser.requestingTo;
    const updatedData1 = data1.map((d: any) => {
      if (d.docId === userLoginDetails.docId) {
        return { ...d, status: 'declined' };
      }
      return d;
    });
    const friendRef = doc(db, 'users', userLoginDetails.docId);
    // below is an async call to update our collection and nothing will be returned
    const tempFriend = await updateDoc(friendRef, {
      requestingTo: updatedData1,
    });
  };

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
              {r.status !== 'approved' && (
                <p onClick={() => handleApproveRequest(r.docId)}>✔️</p>
              )}
              {r.status !== 'declined' && (
                <p onClick={() => handleDeclineRequest(r.docId)}>✖️</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
