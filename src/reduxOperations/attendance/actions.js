import {createActions} from 'redux-actions';
import types from './types';

export const {setSubjectAttendance} = createActions(
  types.SET_SUBJECT_ATTENDANCE,
);
