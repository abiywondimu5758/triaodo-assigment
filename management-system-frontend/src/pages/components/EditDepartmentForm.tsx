import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Department } from '../../types';
import { updateDepartment } from '../../store/departmentsSlice';
import { store } from '@/store/store';

interface EditDepartmentFormProps {
  department: Department;
  onClose: () => void;
}

const EditDepartmentForm: React.FC<EditDepartmentFormProps> = ({ department, onClose }) => {
  const [name, setName] = useState(department.name);
  const [description, setDescription] = useState(department.description);
  // const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDepartment = { ...department, name, description };
    store.dispatch(updateDepartment(updatedDepartment));
    onClose(); 
  };

  return (
    <div>
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditDepartmentForm;
