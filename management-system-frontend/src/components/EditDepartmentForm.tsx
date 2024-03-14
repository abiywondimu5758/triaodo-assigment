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
import { updateDepartment } from '../store/departmentsSlice';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let parsedId: number | undefined;

    if (managing_department_id !== undefined) {
      parsedId = parseInt(managing_department_id.toString(), 10);
    }
    const updatedDepartment = { ...department, name, description, managing_department_id: parsedId };
   
    store.dispatch(updateDepartment(updatedDepartment));
    onClose();
  };

  return (
    <Paper shadow="sm" style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 15 }}>Edit Department</h2>
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
            data={departments.map((departmentSelected) => ({
              value: departmentSelected.id.toString(),
              label: departmentSelected.name,
            }))}
            placeholder="Select Managing Department"
            value={managing_department_id?.toString()}
            onChange={(value) => setManagingDepartmentId(value ? parseInt(value, 10) : undefined)}
            style={{ marginBottom: 15 }}
          />
        )}

        <Button variant="outline" type="submit" fullWidth>
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default EditDepartmentForm;
