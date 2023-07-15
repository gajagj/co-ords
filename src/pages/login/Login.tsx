import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import GoogleIcon from '@mui/icons-material/Google';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db, signInWithGoogle } from '../../service/firebase';
import { LoginUserDetail, setLogin } from './loginSlice';

// import './login.css';
import styles from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredUsers, SetRegisteredUsers] = useState<
    DocumentData[] | LoginUserDetail[]
  >([]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required *'),
      password: Yup.string().required('Required *'),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersFromFireStore: DocumentData[] | LoginUserDetail =
          querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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
      console.log(accessToken);
      const isUserAlreadyExist = registeredUsers.find(
        (r: DocumentData) => r.email === email,
      );
      console.log(isUserAlreadyExist, 'isUserAlreadyExist');

      if (!isUserAlreadyExist?.accessToken) {
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
          currentUser.docId = docRef.id;
          localStorage.setItem('isUserLoggedIn', 'true');
          localStorage.setItem('userDetails', JSON.stringify(currentUser));
          dispatch(setLogin(currentUser));
        }
      } else {
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('userDetails', JSON.stringify(isUserAlreadyExist));
        dispatch(setLogin(isUserAlreadyExist));
      }
      navigate('/home');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <div className={styles.container}>
      <img alt="co-ords" src="/public/logo.svg" width={200} />
      <h2>Anywhere! Know where and be there!</h2>
      <div className={styles.formWrapper}>
        <form className="flex f-column" onSubmit={formik.handleSubmit}>
          <h3>Welcome Back</h3>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            label="Email"
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormControl className="f-basis" variant="outlined">
            <OutlinedInput
              label="Password"
              size="small"
              className="f-basis"
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <FormHelperText
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>
          <LoadingButton type="submit" variant="contained">
            Login
          </LoadingButton>

          <div className={styles.horizontalLine} />

          <button
            onClick={handleGoogleLogin}
            type="button"
            className={styles.googleButton}
          >
            <img alt="google" src="/public/google.svg" width={20} />
            <span> Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
