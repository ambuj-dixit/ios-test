import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  attendanceSubjectWise: null,
};

const loginReducer = handleActions(
  {
    [types.SET_SUBJECT_ATTENDANCE]: (state, {payload}) => ({
      ...state,
      attendanceSubjectWise: payload,
    }),
  },
  initialState,
);

export default loginReducer;
