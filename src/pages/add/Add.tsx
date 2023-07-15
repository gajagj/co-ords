import React, { useEffect } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';

import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { LoginUserDetail, selectLoginDetails } from '../login/loginSlice';

import styles from './Add.module.css';
import { useSelector } from 'react-redux';

const Add = () => {
  const [search, setSearch] = React.useState('');
  const [resultedSearch, setResultedSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const userDetails = useSelector(selectLoginDetails);
  const [filteredUsers, setFilteredUsers] = React.useState<
    Partial<LoginUserDetail>[] | null
  >(null);

  const handleSearch = () => {
    if (search.length === 0) return;
    if (resultedSearch === search) return;
    setResultedSearch(search);
    setLoading(true);
    getDocs(collection(db, 'users'))
      .then((querySnapshot) => {
        const usersFromFireStore: DocumentData[] | Partial<LoginUserDetail> =
          querySnapshot.docs.map((doc) => doc.data());

        const filteredUsers = usersFromFireStore.filter(
          (user: Partial<LoginUserDetail>) =>
            (user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
              user.email?.toLowerCase().includes(search.toLowerCase()) ||
              user.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
              user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
              user.lastName?.toLowerCase().includes(search.toLowerCase())) &&
            user.uid !== userDetails?.uid,
        );
        setFilteredUsers(filteredUsers);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Connect with your Family & Friends</h1>
      <div className={styles.searchContainer}>
        <TextField
          type="text"
          id="search"
          name="search"
          value={search}
          placeholder="Search..."
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <LoadingButton
                variant="contained"
                size="large"
                disableElevation
                sx={{
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  zIndex: 1,
                }}
                disabled={loading}
                onClick={handleSearch}
              >
                <span>Search</span>
              </LoadingButton>
            ),
            startAdornment: <SearchIcon color="disabled" />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingRight: '0px',
            },
          }}
        />
      </div>
      <div className={styles.contentContainer}>
        {loading && (
          <div className={styles.contentPlaceholder}>
            <CircularProgress />
          </div>
        )}
        {!loading && filteredUsers === null && (
          <div className={styles.contentPlaceholder}>
            Search to connect with your family & friends
          </div>
        )}
        {resultedSearch.length > 0 &&
          filteredUsers?.length === 0 &&
          !loading && (
            <div className={styles.contentPlaceholder}>
              No results found for {resultedSearch}
            </div>
          )}
        {filteredUsers?.length > 0 && !loading && (
          <>
            <div>
              {filteredUsers?.length} results found for {search}
            </div>
            <div className={styles.userListContainer}>
              {filteredUsers?.map((user: Partial<LoginUserDetail>) => (
                <div className={styles.userCard} key={user.uid}>
                  <div className={styles.userImage}>
                    <Avatar
                      alt={user.displayName?.toUpperCase()}
                      src={user.photoURL}
                    >
                      {user?.displayName?.at(0)?.toUpperCase()}
                    </Avatar>
                  </div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{user.displayName}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                  </div>
                  <div className={styles.requestButtonContainer}>
                    <LoadingButton variant="contained" size="small">
                      Request
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Add;
