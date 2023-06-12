import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/storeCreation';

type InitialState = {
  isLogin: boolean;
  user: object;
};

const initialState: InitialState = {
  isLogin: false,
  user: {},
};
//slice
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
  },
});

// actions
export const { setLogin } = LoginSlice.actions;

// reducer
export default LoginSlice.reducer;

// selectors
export const selectIsLogin = (state: RootState) => state.login.isLogin;
