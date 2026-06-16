import {createActions} from 'redux-actions';
import types from './types';

export const {
  setCourses,
  setSubjects,
  setSemesters,
  setSections,
  setSpecializations,
  setStudents,
} = createActions(
  types.SET_COURSES,
  types.SET_SUBJECTS,
  types.SET_SEMESTERS,
  types.SET_SECTIONS,
  types.SET_SPECIALIZATIONS,
  types.SET_STUDENTS,
);
