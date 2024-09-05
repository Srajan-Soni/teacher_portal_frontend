import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
