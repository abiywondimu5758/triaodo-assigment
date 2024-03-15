/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/space-infix-ops */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */

import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Department } from '../types';
import { fetchDepartments, updateDepartment } from '../store/departmentsSlice';
import {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} from '../store/notificationsSlice';
import { TextInput, Button, Paper, Select } from '@mantine/core';
import { RootState, store } from '@/store/store';
import { useSelector } from 'react-redux';

interface EditDepartmentFormProps {
  department: Department;
  onClose: () => void;
}

const EditDepartmentForm: React.FC<EditDepartmentFormProps> = ({ department, onClose }) => {
  const [name, setName] = useState(department.name);
  const [description, setDescription] = useState(department.description);
  const [managing_department_id, setManagingDepartmentId] = useState(
    department.managing_department_id
  );
  const departments = useSelector((state: RootState) => state.departments.departments);
  // const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !managing_department_id) {
      store.dispatch(setErrorMessage('Please fill in all fields'));
      setTimeout(() => {
        store.dispatch(clearErrorMessage());
      }, 3000);
      return;
    }

    let parsedId: number | undefined;

    if (managing_department_id !== undefined) {
      parsedId = parseInt(managing_department_id.toString(), 10);
    }
    const updatedDepartment = { ...department, name, description, managing_department_id: parsedId };
   
    const response = await store.dispatch(updateDepartment(updatedDepartment));
    if (response.success) {
      store.dispatch(setSuccessMessage('Department edited successfully'));
      setTimeout(() => {
        store.dispatch(clearSuccessMessage());
      }, 3000);
    } else {
      store.dispatch(fetchDepartments());
      store.dispatch(setErrorMessage('Error editing department'));
      setTimeout(() => {
        store.dispatch(clearErrorMessage());
      }, 3000);
    }
    onClose();
  };

  return (
    <Paper style={{ width: 300, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
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
        {department.id === -1 ? (
          <Select disabled={true} />
        ) : (
          <Select
            data={departments.filter(dep => dep.id !== department.id).map((departmentSelected) => ({
              value: departmentSelected.id.toString(),
              label: departmentSelected.name,
            }))}
            placeholder="Select Managing Department"
            value={managing_department_id?.toString()}
            onChange={(value) => setManagingDepartmentId(value ? parseInt(value, 10) : undefined)}
            style={{ marginBottom: 15 }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline" type="submit" >
          Save
        </Button>
        </div>
      </form>
    </Paper>
  );
};

export default EditDepartmentForm;
