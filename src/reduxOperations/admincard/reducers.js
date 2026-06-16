import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  admitCardData: {},
};

const admitCardReducer = handleActions(
  {
    [types.SET_ADMIT_CARD_DETAIL]: (state, {payload}) => ({
      ...state,
      admitCardData: payload,
    }),
  },
  initialState,
);

export default admitCardReducer;
