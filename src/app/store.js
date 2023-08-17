import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import workSpaceSlice from '../components/workSpace/workSpaceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workSpace: workSpaceSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false
  }),
});