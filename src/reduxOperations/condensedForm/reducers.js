import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  amountPay: null,
  savedPaymentData: null,
  subjectDetail: null,
};

const admitCardReducer = handleActions(
  {
    [types.SET_PAY_AMOUNT]: (state, {payload}) => ({
      ...state,
      amountPay: payload,
    }),
    [types.SET_SAVED_PAYMENT_DATA]: (state, {payload}) => ({
      ...state,
      savedPaymentData: payload,
    }),
    [types.SET_CONDENSED_SUBJECT_DETAIL]: (state, {payload}) => ({
      ...state,
      subjectDetail: payload,
    }),
  },
  initialState,
);

export default admitCardReducer;
