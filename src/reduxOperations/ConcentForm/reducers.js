import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  concentformData: {},
};

const concentformReducer = handleActions(
  {
    [types.SET_CONCENT_FORM_DATA]: (state, {payload}) => ({
      ...state,
      concentformData: payload,
    }),
  },
  initialState,
);

export default concentformReducer;
