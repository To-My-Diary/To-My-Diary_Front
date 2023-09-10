import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import workSpaceSlice from '../components/workSpace/workSpaceSlice';
import dataSlice from '../tempData/dataSlice';

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