/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { createDepartment, fetchDepartments } from '../store/departmentsSlice';
import { TextInput, Button, Select } from '@mantine/core';
import { store } from '@/store/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} from '../store/notificationsSlice';

interface AddDepartmentFormProps {
  onClose: () => void;
}

const AddDepartmentForm: React.FC<AddDepartmentFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [managing_department_id, setManagingDepartmentId] = useState<number | undefined>();
  const departments = useSelector((state: RootState) => state.departments.departments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!name || !description || !managing_department_id) {
      store.dispatch(setErrorMessage('Please fill in all fields'));
      setTimeout(() => {
        store.dispatch(clearErrorMessage());
      }, 3000);
      return;
    }
    
    const response = await store.dispatch(
      createDepartment({ name, description, managing_department_id })
    );
    if (response.success) {
      store.dispatch(setSuccessMessage('Department added successfully'));
      setTimeout(() => {
        store.dispatch(clearSuccessMessage());
      }, 3000);
    } else {
      store.dispatch(fetchDepartments());
      store.dispatch(setErrorMessage('Error adding department'));
      setTimeout(() => {
        store.dispatch(clearErrorMessage());
      }, 3000);
    }
    onClose();
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: 300, margin: '0 auto' }}>
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
      <Select
        data={departments.map((department) => ({
          value: department.id.toString(),
          label: department.name,
        }))}
        placeholder="Select Managing Department"
        value={managing_department_id?.toString()}
        onChange={(value) => setManagingDepartmentId(value ? parseInt(value, 10) : undefined)}
        style={{ marginBottom: 15 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="outline">
          Add Department
        </Button>
      </div>
    </form>
  );
};

export default AddDepartmentForm;
