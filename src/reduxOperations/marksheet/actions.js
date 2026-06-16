import {createActions} from 'redux-actions';
import types from './types';

export const {setMarksheetData} = createActions(
  types.SET_MARKSHEET_DATA,
);
