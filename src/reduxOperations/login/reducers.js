import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  isLoading: false,
  userDetails: null,
  instituteDetails: null,
  sessions: [],
};

const loginReducer = handleActions(
  {
    [types.SET_LOGIN_DATA]: (state, {payload}) => ({
      ...state,
      userDetails: payload,
    }),
    [types.SET_INSTITUTE_CODE]: (state, {payload}) => ({
      ...state,
      instituteDetails: payload,
    }),
    [types.LOGIN_SUCCESS]: state => ({
      ...state,
      isLoading: false,
    }),
    [types.SET_SESSIONS]: (state, {payload}) => ({
      ...state,
      sessions: payload,
    }),
  },
  initialState,
);

export default loginReducer;
