import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
import { db, signInWithGoogle } from '../../service/firebase';
import { setLogin } from './loginSlice';
import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredUsers, SetRegisteredUsers] = useState<DocumentData>([]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersFromFireStore: DocumentData[] = querySnapshot.docs.map((doc) =>
        doc.data(),
      );
      SetRegisteredUsers(usersFromFireStore);
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
        localStorage.setItem('isUserLoggedin', 'true');
        dispatch(setLogin(currentUser));

        const docRef = await addDoc(collection(db, 'users'), currentUser);
        console.log('Document written with ID: ', docRef.id);
      } else {
        localStorage.setItem('isUserLoggedin', 'true');
        dispatch(setLogin(isUserAlreadyExist));
      }
      navigate('/home');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <div className="login__container">
      <div className="login__section1"></div>
      <div className="login__section2">
        <h1>Login</h1>
        <form>
          <label>Email : </label>
          <input type="text" />
          <label>Password :</label> <input type="text" />
          <button>Login</button>
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
