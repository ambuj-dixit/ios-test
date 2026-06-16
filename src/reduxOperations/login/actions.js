import {createActions} from 'redux-actions';
import types from './types';

export const {setLoginData, setInstituteCode, setSessions} = createActions(
  types.SET_LOGIN_DATA,
  types.SET_INSTITUTE_CODE,
  types.SET_SESSIONS,
);
