import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  otpDetails: {},
};

const admitCardReducer = handleActions(
  {
    [types.SET_EMAIL_VERIFICATION]: (state, {payload}) => ({
      ...state,
      otpDetails: payload,
    }),
  },
  initialState,
);

export default admitCardReducer;
