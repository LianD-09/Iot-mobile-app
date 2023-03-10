import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userName: '',
  data: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    update: (state, action) => {
      state.data = {...state.data, ...action.payload}
    }
  },
});

//reducer
const userReducer = userSlice.reducer;

export const userDataSelector = state => state.userReducer.data;
export const { login, update } = userSlice.actions;
export default userReducer;
