/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notificationReducer from './notificationsSlice';
import departmentsReducer from './departmentsSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    departments: departmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
