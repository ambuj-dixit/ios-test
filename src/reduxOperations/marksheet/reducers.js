import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  marksheetData: {},
};

const marksheetReducer = handleActions(
  {
    [types.SET_MARKSHEET_DATA]: (state, {payload}) => ({
      ...state,
      marksheetData: payload,
    }),
  },
  initialState,
);

export default marksheetReducer;
