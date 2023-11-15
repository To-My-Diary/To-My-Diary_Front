import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import workSpaceSlice from '../slices/workSpaceSlice';
import dataSlice from '../slices/dataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workSpace: workSpaceSlice.reducer,
    tempData: dataSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false
  }),
});