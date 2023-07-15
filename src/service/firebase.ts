import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBP0W_CMDhKPSi1XZhoxBly7n0GtQTuAmk',
  authDomain: 'co-ords-63590.firebaseapp.com',
  projectId: 'co-ords-63590',
  storageBucket: 'co-ords-63590.appspot.com',
  messagingSenderId: '599746160603',
  appId: '1:599746160603:web:098d8a10192ce61f9369fe',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .then((res: any) => {
      console.log('signInWithGoogle success', res.user);
      return res.user;
    })
    .catch((error: any) => {
      console.log('signInWithGoogle error', error.message);
    });
};

export const logoutWithGoogle = () => {
  return signOut(auth)
    .then(() => {
      console.log('Logout successful');
      return true;
    })
    .catch((error) => {
      console.log('Logout error', error.message);
      return false;
    });
};

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

// get all docs from user collection
export const getAllDataFromUserCollection = async () => {
  const db = getFirestore();
  const colRef = collection(db, 'users');
  const docList: any = [];
  try {
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      docList.push({ ...doc.data(), docId: doc.id });
    });
    return docList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get single doc from user collection by its docId
export const getDocumentByDocId = async (docId: string) => {
  const db = getFirestore();

  const docRef = doc(db, 'users', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  // docSnap.data() will be undefined in this case
  console.log('No such document!');
  return {};
};
