import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/storeCreation';
type LoginUserDetail = {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string;
  photoURL: string;
  uid: string;
};
type InitialState = {
  loginDetails: LoginUserDetail;
};

const initialState: InitialState = {
  loginDetails: {
    accessToken: '',
    displayName: '',
    email: '',
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: '',
    photoURL: '',
    uid: '',
  },
};
//slice
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (
      state: InitialState,
      action: {
        payload: LoginUserDetail;
      },
    ) => {
      state.loginDetails = action.payload;
    },
    setLogOut: (state) => {
      state.loginDetails = initialState.loginDetails;
    },
  },
});

// actions
export const { setLogin, setLogOut } = LoginSlice.actions;

// reducer
export default LoginSlice.reducer;

// selectors

export const selectLoginDetails = (state: RootState) =>
  state.login.loginDetails;
