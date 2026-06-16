import {createActions} from 'redux-actions';
import types from './types';

export const {
  setFeeDueDetail,
  setVoucherDetail,
  setReceiptDetail,
  setPrevTransactionDetail,
  setPostPaymentResponse,
  setStudentFeeHeadVoucharDetail,
} = createActions(
  types.SET_FEE_DUE_DETAIL,
  types.SET_VOUCHER_DETAIL,
  types.SET_RECEIPT_DETAIL,
  types.SET_PREV_TRANSACTION_DETAIL,
  types.SET_POST_PAYMENT_RESPONSE,
  types.SET_STUDENT_FEE_HEAD_VOUCHAR_DETAIL,
);
