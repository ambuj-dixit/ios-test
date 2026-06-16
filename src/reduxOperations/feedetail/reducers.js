import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  feeDueDetail: {},
  voucherDetail: [],
  receiptDetail: [],
  prevTransactionDetail: [],
  studentFeeHeadVoucharDetail: [],
};

const admitCardReducer = handleActions(
  {
    [types.SET_FEE_DUE_DETAIL]: (state, {payload}) => ({
      ...state,
      feeDueDetail: payload,
    }),
    [types.SET_VOUCHER_DETAIL]: (state, {payload}) => ({
      ...state,
      voucherDetail: payload,
    }),
    [types.SET_RECEIPT_DETAIL]: (state, {payload}) => ({
      ...state,
      receiptDetail: payload,
    }),
    [types.SET_PREV_TRANSACTION_DETAIL]: (state, {payload}) => ({
      ...state,
      prevTransactionDetail: payload,
    }),
    [types.SET_STUDENT_FEE_HEAD_VOUCHAR_DETAIL]: (state, {payload}) => ({
      ...state,
      studentFeeHeadVoucharDetail: payload,
    }),
  },
  initialState,
);

export default admitCardReducer;
