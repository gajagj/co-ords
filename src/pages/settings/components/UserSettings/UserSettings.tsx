import React from 'react';
import { TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import { selectLoginDetails, setProfile } from '../../../login/loginSlice';
import { db } from '../../../../service/firebase';

import styles from './UserSettings.module.css';

const UserSettings = ({ setShowWizard }: any) => {
  const userDetails = useSelector(selectLoginDetails);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.firstName
        ? userDetails?.firstName
        : userDetails?.displayName.split(' ')?.at(0) ?? '',
      lastName: userDetails?.lastName
        ? userDetails?.lastName
        : userDetails?.displayName.split(' ')?.slice(1).join(' ') ?? '',
      phoneNumber: userDetails?.phoneNumber ?? '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required *'),
      lastName: Yup.string().required('Required *'),
      phoneNumber: Yup.string()
        .required('Required *')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
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
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phoneNumber: values.phoneNumber,
        }).then(() => {
          dispatch(
            setProfile({
              firstName: values.firstName.trim(),
              lastName: values.lastName.trim(),
              phoneNumber: values.phoneNumber,
            }),
          );
        });
      }
    },
  });
  return (
    <div className={styles.wizard}>
      <div className={styles.header} onClick={() => setShowWizard(0)}>
        <ChevronLeftIcon />
        <h2>User Settings</h2>
      </div>
      <form className={styles.contentContainer} onSubmit={formik.handleSubmit}>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">Email</label>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="email"
            id="email"
            value={userDetails?.email}
            disabled
          />
        </div>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">First Name</label>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="firstName"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">Last Name</label>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="lastName"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div className="w-100p flex f-align-center">
          <label className="f-basis">Phone Number</label>
          <TextField
            variant="outlined"
            size="small"
            className="f-basis"
            name="phoneNumber"
            id="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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

export default UserSettings;
