/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: NotificationState = {
  successMessage: null,
  errorMessage: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
