import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  coursesList: [],
  semestersList: [],
  specializationsList: [],
  subjectsList: [],
  sectionsList: [],
  studentsList: [],
};

const concentformReducer = handleActions(
  {
    [types.SET_COURSES]: (state, {payload}) => ({
      ...state,
      coursesList: payload,
    }),
    [types.SET_SECTIONS]: (state, {payload}) => ({
      ...state,
      sectionsList: payload,
    }),
    [types.SET_SEMESTERS]: (state, {payload}) => ({
      ...state,
      semestersList: payload,
    }),
    [types.SET_SPECIALIZATIONS]: (state, {payload}) => ({
      ...state,
      specializationsList: payload,
    }),
    [types.SET_SUBJECTS]: (state, {payload}) => ({
      ...state,
      subjectsList: payload,
    }),
    [types.SET_STUDENTS]: (state, {payload}) => ({
      ...state,
      studentsList: payload,
    }),
  },
  initialState,
);

export default concentformReducer;
