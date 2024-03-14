/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/order */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deleteDepartment, fetchDepartments } from "../store/departmentsSlice";
import { Button, Divider, Loader, Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { store } from "../store/store";
import AddDepartmentForm from "../components/AddDepartmentForm";
import EditDepartmentForm from "../components/EditDepartmentForm";
import { Department } from "@/types";

const Dashboard: React.FC = () => {
    const [editDepartment, setEditDepartment] = useState<Department | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const departments = useSelector((state: RootState) => state.departments.departments);
    const loading = useSelector((state: RootState) => state.departments.loading);
    const error = useSelector((state: RootState) => state.departments.error);

    useEffect(() => {
        store.dispatch(fetchDepartments());
    }, [store]);

    const theme = useMantineTheme();

    const handleDelete = (id: number) => {
        store.dispatch(deleteDepartment(id));
    };

    const handleEdit = (department: Department) => {
        setEditDepartment(department);
    };

    const handleCloseEdit = () => {
        setEditDepartment(null);
    };

    const handleSelectedDepartment = (department: Department) => {
        setSelectedDepartment(department);
    };

    const handleCloseSelectedDepartment = () => {
        setSelectedDepartment(null);
    };

    const handleAddButtonClick = () => {
        setShowAddForm(prev => !prev);
    };

    const handleCloseAddForm = () => {
        setShowAddForm(false);
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}><Loader size="md" /></div>;
    }

    if (error) {
        return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', justifyItems: 'start' }}><Text color="red" size="xl">{'Could not Load because of '}{error}</Text></div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Dashboard</h1>
            <Button variant="outline" onClick={handleAddButtonClick} style={{ marginBottom: theme.spacing.xs }}>Add Department</Button>
            {showAddForm && <AddDepartmentForm onClose={handleCloseAddForm} />}
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {departments.map((department) => (
                    <div key={department.id} style={{ marginBottom: theme.spacing.xs }}>
                        <Text>
                            {department.name} - {department.id}
                        </Text>
                        <div style={{ display: 'flex', marginTop: theme.spacing.xs }}>
                            {department.managing_department_id === -1 ? null : (<><Button onClick={() => handleDelete(department.id)} variant="outline">Delete</Button>
                            <Button onClick={() => handleEdit(department)} variant="outline" style={{ marginLeft: theme.spacing.xs }}>Edit</Button></>)}
                            <Button onClick={() => handleSelectedDepartment(department)} variant="outline" style={{ marginLeft: theme.spacing.xs }}>Manage</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Divider />
            {editDepartment && (
                <EditDepartmentForm department={editDepartment} onClose={handleCloseEdit} />
            )}
            {selectedDepartment && (
                <div>
                    <Text>Department Name: {selectedDepartment.name}</Text>
                    <Text>Description: {selectedDepartment.description}</Text>
                    <Text>Managing Department: {selectedDepartment && departments.find(dep => dep.id === selectedDepartment.managing_department_id)?.name || 'None'}</Text>
                    <Text>Departments Under It: {selectedDepartment && departments
                        .filter(dep => dep.managing_department_id === selectedDepartment.id)
                        .map(dep => dep.name)
                        .join(', ') || 'None'}
                    </Text>
                    <Button variant="outline" onClick={handleCloseSelectedDepartment}>Close</Button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
