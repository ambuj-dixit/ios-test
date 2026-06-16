import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  facultyAttendance: {},
};

const facultyAttendanceReducer = handleActions(
  {
    [types.SET_ATTENDANCE]: (state, {payload}) => ({
      ...state,
      facultyAttendance: payload,
    }),
  },
  initialState,
);

export default facultyAttendanceReducer;
