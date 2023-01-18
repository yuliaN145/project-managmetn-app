import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  login: '',
  id: localStorage.getItem('userId') || '',
  token: localStorage.getItem('token') || '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});
