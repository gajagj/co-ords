import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
    });
};

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
