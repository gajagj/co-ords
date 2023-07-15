import React from 'react';
import { TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import styles from './PasswordManagement.module.css';
import { selectLoginDetails, setPassword } from '../../../login/loginSlice';
import { db } from '../../../../service/firebase';

const PasswordManagement = ({ setShowWizard }: any) => {
  const userDetails = useSelector(selectLoginDetails);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required *'),
      confirmPassword: Yup.string()
        .required('Required *')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),

    onSubmit: async (values) => {
      const q = query(
        collection(db, 'users'),
        where('email', '==', userDetails?.email),
        limit(1),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const d = querySnapshot.docs[0];
        const documentId = d.id;
        await updateDoc(doc(db, 'users', documentId), {
          password: values.password.trim(),
          isPasswordSet: true,
        }).then(() => {
          dispatch(setPassword(true));
        });
      }
    },
  });
  return (
    <div className={styles.wizard}>
      <div className={styles.header} onClick={() => setShowWizard(0)}>
        <ChevronLeftIcon />
        <h2>Password Management</h2>
      </div>
      <form className={styles.contentContainer} onSubmit={formik.handleSubmit}>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">Password</label>
          <FormControl className="f-basis" variant="outlined">
            <OutlinedInput
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
        </div>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">Confirm Password</label>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>
        <div className={`${styles.button_group} flex`}>
          <Button variant="outlined" onClick={() => formik.resetForm()}>
            Reset
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={formik.isSubmitting}
            loadingPosition="start"
            disabled={!formik.dirty}
          >
            <span>Save</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default PasswordManagement;
