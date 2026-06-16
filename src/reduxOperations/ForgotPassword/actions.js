import {createActions} from 'redux-actions';
import types from './types';

export const {
  setEmailVerification,

  setResetPassword
} = createActions(
  types.SET_EMAIL_VERIFICATION,
  types.SET_RESET_PASSWORD
);
