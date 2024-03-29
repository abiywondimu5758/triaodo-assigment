

import { Action } from '@reduxjs/toolkit';
import { RootState } from './store/store';
import { ThunkAction } from 'redux-thunk';

export interface Department {
    id: number;
    name: string;
    description: string;
    managing_department_id?: number;
  }

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
