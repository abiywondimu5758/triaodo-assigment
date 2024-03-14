/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { addDepartment, createDepartment } from '../store/departmentsSlice';

import { TextInput, Button } from '@mantine/core';
import { store } from '@/store/store';

interface props {
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
const AddDepartmentForm = ({onClose}:props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [managing_department_id, setManagingDepartmentId] = useState();
  
  // const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.dispatch(createDepartment({ name, description, managing_department_id }));
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 15 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: 15 }}
      />
      <Button type="submit" variant="outline" fullWidth>
        Add Department
      </Button>
    </form>
  );
};

export default AddDepartmentForm;
