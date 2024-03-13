import React, { useState } from 'react';
import { addDepartment, createDepartment } from '../../store/departmentsSlice';
import { store } from '@/store/store';

const AddDepartmentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.dispatch(createDepartment({name, description }));
    setName('');
    setDescription('');
  };

  return (
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
      <button type="submit">Add Department</button>
    </form>
  );
};

export default AddDepartmentForm;
