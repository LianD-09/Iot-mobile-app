import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../../features/todolist/todosSlice';
import userReducer from '../../features/authentication/userSlice';
import apartmentReducer from '../../features/apartment/aparmentSlice';

const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
    userReducer: userReducer,
    aparmentReducer: apartmentReducer,
  },
});
//selector

export default store;
