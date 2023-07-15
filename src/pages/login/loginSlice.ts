import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/storeCreation';

export type LoginUserDetail = {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  isPasswordSet?: boolean;
  docId: string;
  requestingTo: any[];
  requestedFrom: any[];
};
type InitialState = {
  loginDetails: LoginUserDetail;
};

const preservedUserDetails: LoginUserDetail = localStorage.getItem(
  'userDetails',
)
  ? JSON.parse(localStorage.getItem('userDetails') || '{}')
  : null;

const initialState: InitialState = {
  loginDetails: preservedUserDetails || {
    accessToken: '',
    displayName: '',
    email: '',
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: '',
    photoURL: '',
    uid: '',
    firstName: '',
    lastName: '',
    isPasswordSet: false,
    docId: '',
  },
};
// slice
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
    setProfile: (
      state: InitialState,
      action: {
        payload: Partial<LoginUserDetail>;
      },
    ) => {
      state.loginDetails.firstName = action.payload.firstName ?? '';
      state.loginDetails.lastName = action.payload.lastName ?? '';
      state.loginDetails.phoneNumber = action.payload.phoneNumber ?? '';
    },
    setPassword: (state: InitialState, action: { payload: boolean }) => {
      state.loginDetails.isPasswordSet = action.payload;
    },
    setLogOut: (state) => {
      state.loginDetails = initialState.loginDetails;
    },
  },
});

// actions
export const { setLogin, setLogOut, setProfile, setPassword } =
  LoginSlice.actions;

// reducer
export default LoginSlice.reducer;

// selectors

export const selectLoginDetails = (state: RootState) =>
  state.login.loginDetails;
