/* eslint-disable linebreak-style */
// eslint-disable-next-line no-multiple-empty-lines

// NotificationComponent.tsx

import React from 'react';
import { Notification } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearSuccessMessage, clearErrorMessage } from '../store/notificationsSlice';

const NotificationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const successMessage = useSelector((state: RootState) => state.notification.successMessage);
  const errorMessage = useSelector((state: RootState) => state.notification.errorMessage);

  const handleClose = () => {
    dispatch(clearSuccessMessage());
    dispatch(clearErrorMessage());
  };

  if (!successMessage && !errorMessage) {
    return null; // Don't render anything if there's no notification message
  }

  return (
    <Notification
      title="Notification"
      onClose={handleClose}
      withCloseButton
      withBorder
      style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      color={successMessage ? 'green' : 'red'}
    >
      {successMessage || errorMessage}
    </Notification>
  );
};

export default NotificationComponent;
