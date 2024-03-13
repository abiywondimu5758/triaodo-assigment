import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import axios from 'axios';

interface Department {
  id: number;
  name: string;
  description: string;
  managingDepartmentId?: number;
}

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
    const response = await axios.put(`http://localhost:4000/departments/${updatedDepartment.id}/`, updatedDepartment);
    dispatch(fetchDepartmentsSuccess);
    console.log(`updated ${updatedDepartment.id}`);
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
  }
};

export const deleteDepartment = (departmentId: number): AppThunk => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/departments/${departmentId}/`);
    dispatch(fetchDepartmentsSuccess);
    console.log(`deleted ${departmentId}`);
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
  }
};

export const createDepartment = (newDepartment: Omit<Department, 'id'>): AppThunk => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4000/departments/', newDepartment);
    dispatch(addDepartment(response.data)); 
    console.log(`created ${response.data}`);
  } catch (error: any) {
    dispatch(fetchDepartmentsFailure(error.message));
  }
};
