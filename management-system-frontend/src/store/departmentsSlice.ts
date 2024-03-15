/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */

/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import axios from 'axios';
import { Department } from '@/types';

interface DepartmentsState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentsState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    fetchDepartmentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDepartmentsSuccess(state, action: PayloadAction<Department[]>) {
      state.departments = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDepartmentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addDepartment(state, action: PayloadAction<Department>) {
      state.departments.push(action.payload);
    },
  },
});

export const {
  fetchDepartmentsStart,
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
  addDepartment,
} = departmentsSlice.actions;

export default departmentsSlice.reducer;

export const fetchDepartments = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchDepartmentsStart());
    const response = await axios.get('http://localhost:4000/departments/');
    
    dispatch(fetchDepartmentsSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
  }
};

export const updateDepartment = (updatedDepartment: Department): AppThunk => async (dispatch) => {
  try {
    await axios.put(`http://localhost:4000/departments/${updatedDepartment.id}/`, updatedDepartment);
    dispatch(fetchDepartmentsSuccess);
    return { success: true }; 
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const deleteDepartment = (departmentId: number): AppThunk => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:4000/departments/${departmentId}/`);
    console.log(response);
    dispatch(fetchDepartmentsSuccess);
    return { success: true }; 
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const createDepartment = (newDepartment: Omit<Department, 'id'>): AppThunk => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4000/departments/', newDepartment);
    dispatch(addDepartment(response.data)); 
    return { success: true }; 
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
    return { success: false, error: error.message };
  }
};
