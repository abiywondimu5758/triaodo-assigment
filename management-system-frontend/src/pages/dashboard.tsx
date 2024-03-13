import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deleteDepartment, fetchDepartments } from "../store/departmentsSlice";

import { store } from "../store/store";
import AddDepartmentForm from "./components/AddDepartmentForm";
import { Department } from "@/types";
import EditDepartmentForm from "./components/EditDepartmentForm";

const Dashboard: React.FC = () => {
    const [editDepartment, setEditDepartment] = useState<Department | null>(null);
  // const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const loading = useSelector((state: RootState) => state.departments.loading);
  const error = useSelector((state: RootState) => state.departments.error);

  useEffect(() => {
    store.dispatch(fetchDepartments());
  }, [store]);

  const handleDelete = (id: number) => {
    store.dispatch(deleteDepartment(id));
  };

  const handleEdit = (department: Department) => {
    setEditDepartment(department);
  };

  const handleCloseEdit = () => {
    setEditDepartment(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <AddDepartmentForm />
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            {department.name} - {department.description}
            <button onClick={() => handleDelete(department.id)}>Delete</button>
            <button onClick={() => handleEdit(department)}>Edit</button>
          </li>
        ))}
      </ul>
      {editDepartment && (
        <EditDepartmentForm department={editDepartment} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default Dashboard;
