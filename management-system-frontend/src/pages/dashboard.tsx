/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/order */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteDepartment, fetchDepartments } from '../store/departmentsSlice';
import {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} from '../store/notificationsSlice';
import { Button, Divider, Loader, Text, Modal } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { store } from '../store/store';
import AddDepartmentForm from '../components/AddDepartmentForm';
import EditDepartmentForm from '../components/EditDepartmentForm';
import { Department } from '@/types';
import { Tree } from 'react-d3-tree';

const Dashboard: React.FC = () => {
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [treeData, setTreeData] = useState<any>(null);

  const departments = useSelector((state: RootState) => state.departments.departments);
  const loading = useSelector((state: RootState) => state.departments.loading);
  const errorLoading = useSelector((state: RootState) => state.departments.error);

  useEffect(() => {
    store.dispatch(fetchDepartments());
  }, [store, editDepartment, selectedDepartment]);

  const theme = useMantineTheme();

  const handleDelete = async (id: number) => {
    try {
      const response = await store.dispatch(deleteDepartment(id));
      if (response.success) {
        store.dispatch(fetchDepartments());
        store.dispatch(setSuccessMessage('Department deleted successfully'));
        setTimeout(() => {
          store.dispatch(clearSuccessMessage());
        }, 3000);
      } else {
        store.dispatch(fetchDepartments());
        store.dispatch(setErrorMessage('Error deleting department'));
        setTimeout(() => {
          store.dispatch(clearErrorMessage());
        }, 3000);
      }
    } catch (e) {
      store.dispatch(fetchDepartments());
      store.dispatch(setErrorMessage('Error deleting department'));
      setTimeout(() => {
        store.dispatch(clearErrorMessage());
      }, 3000);
    }
  };

  const handleEdit = (department: Department) => {
    setEditDepartment(department);
    setShowEditForm(true);
  };

  const handleCloseEdit = () => {
    setEditDepartment(null);
    setShowEditForm(false);
  };

  const handleCloseSelectedDepartment = () => {
    setSelectedDepartment(null);
    setTreeData(null);
  };

  const handleAddButtonClick = () => {
    setShowAddForm((prev) => !prev);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const generateTreeData = (department: Department): any => {
    const parent = departments.find(dep => dep.id === department.managing_department_id);
    // console.log(parent);
    const data: any = {
      name: department.name,
      attributes: {
        description: department.description,
      },
      parent: parent ? {
        name: parent.name,
        attributes: {
          description: parent.description,
        },
      } : null,
      children: departments
        .filter((dep) => dep.managing_department_id === department.id)
        .map((dep) => generateTreeData(dep)),
    };
    console.log(data);
    return data;
  };
  
  const handleManage = (department: Department) => {
    setSelectedDepartment(department);
    const data = generateTreeData(department);
    setTreeData(data);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader size="md" />
      </div>
    );
  }

  if (errorLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Text color="red" size="xl">
          {'Could not Load because of '}
          {errorLoading}
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 pr-20 h-full mt-0 min-w-full justify-around space-y-6 space-x-6 items-center md:flex-row md:items-start md:space-x-6 md:space-y-0">
      <div className="flex">
        <div className="flex flex-col items-center border-2 p-4 w-[350px] sm:w-[500px] h-96">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-lg text-blue-400 mb-4">List of departments</span>
            <Button variant="outline" onClick={handleAddButtonClick} className="text-xs py-1 px-2">
              Add Department
            </Button>
          </div>
          <div className="flex flex-col items-center border-2 p-4 w-full h-full overflow-auto">
            {departments.map((department) => (
              <div
                key={department.id}
                className="flex items-center space-x-4 mb-4 rounded-md border-2 p-2 sm:4 w-full justify-between"
              >
                <Text className="text-xs w-10 sm:text-sm sm:w-80">
                  {department.name} - {department.description}
                </Text>
                <div className="flex space-x-2">
                  {department.managing_department_id === -1 ? null : (
                    <>
                      <Button
                        onClick={() => handleDelete(department.id)}
                        variant="outline"
                        className="text-xs p-0 w-10 h-6"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleEdit(department)}
                        variant="outline"
                        className="text-xs p-0 w-10 h-6"
                      >
                        Edit
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={() => handleManage(department)}
                    variant="outline"
                    className="text-xs p-0 w-14 h-6"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider />

        <Modal opened={showAddForm} onClose={handleCloseAddForm} title="Add Department">
          <AddDepartmentForm onClose={handleCloseAddForm} />
        </Modal>
        <Modal opened={showEditForm} onClose={handleCloseEdit} title="Edit Department">
          {editDepartment && (
            <EditDepartmentForm department={editDepartment} onClose={handleCloseEdit} />
          )}
        </Modal>
      </div>
      <>
        {selectedDepartment && (
          <div>
            <Text className="text-xs flex justify-start items-center">
              Department Name:{' '}
              <Text className="ml-2 font-bold text-xs">{selectedDepartment.name}</Text>
            </Text>
            <Text className="text-xs flex justify-start items-center">
              Department Description:{' '}
              <Text className="ml-2 font-bold text-xs">{selectedDepartment.description}</Text>
            </Text>
            <Text className="text-xs flex justify-start items-center">
              Managing Department:{' '}
              <Text className="ml-2 font-bold text-xs">
                {' '}
                {(selectedDepartment &&
                  departments.find((dep) => dep.id === selectedDepartment.managing_department_id)
                    ?.name) ||
                  'None'}
              </Text>
            </Text>
            <Text className="text-xs flex justify-start items-center">
              Departments Under It:{' '}
              <Text className="ml-2 font-bold text-xs">
                {' '}
                {(selectedDepartment &&
                  departments
                    .filter((dep) => dep.managing_department_id === selectedDepartment.id)
                    .map((dep) => dep.name)
                    .join(', ')) ||
                  'None'}
              </Text>
            </Text>

            <Button
              variant="outline"
              onClick={handleCloseSelectedDepartment}
              className="text-xs p-0 w-10 h-6"
            >
              Close
            </Button>
          </div>
        )}
        {treeData && (
          <div className="h-96 w-[400px] border-2">
            <Tree
              data={treeData}
              orientation="vertical"
              separation={{ siblings: 1, nonSiblings: 2 }}
              translate={{ x: 50, y: 50 }}
              collapsible={false}
              nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10 } }}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default Dashboard;
