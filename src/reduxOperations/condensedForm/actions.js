import {createActions} from 'redux-actions';
import types from './types';

export const {setPayAmount, setSavedPaymentData, setCondensedSubjectDetail} =
  createActions(
    types.SET_PAY_AMOUNT,
    types.SET_SAVED_PAYMENT_DATA,
    types.SET_CONDENSED_SUBJECT_DETAIL,
  );
