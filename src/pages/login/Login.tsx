import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
import { db, signInWithGoogle } from '../../service/firebase';
import { LoginUserDetail, setLogin } from './loginSlice';
import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredUsers, SetRegisteredUsers] = useState<
    DocumentData[] | LoginUserDetail[]
  >([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersFromFireStore: DocumentData[] | LoginUserDetail =
          querySnapshot.docs.map((doc) => doc.data());
        SetRegisteredUsers(usersFromFireStore);
      } catch {
        console.log('Error while fetching users collection data');
      }
    };
    getUsers();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const {
        accessToken,
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        uid,
      } = await signInWithGoogle();
      const isUserAlreadyExist = registeredUsers.find(
        (r: DocumentData) => r.email === email,
      );
      if (!isUserAlreadyExist.accessToken) {
        const currentUser = {
          accessToken,
          displayName,
          email,
          emailVerified,
          isAnonymous,
          phoneNumber,
          photoURL,
          uid,
        };
        const docRef = await addDoc(collection(db, 'users'), currentUser);
        console.log('Document written with ID: ', docRef.id);
        if (docRef.id) {
          localStorage.setItem('isUserLoggedIn', 'true');
          dispatch(setLogin(currentUser));
        }
      } else {
        localStorage.setItem('isUserLoggedIn', 'true');
        dispatch(setLogin(isUserAlreadyExist));
      }
      navigate('/home');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <div className="login__container">
      <div className="login__section1" />
      <div className="login__section2">
        <h1>LOGIN</h1>
        <form>
          <button onClick={handleGoogleLogin} type="button">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
              alt="google icon"
            />
            <span> Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
