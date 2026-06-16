import {createActions} from 'redux-actions';
import types from './types';

export const {setConcentFormData, concertFormSuccess} = createActions(
  types.SET_CONCENT_FORM_DATA,
  types.CONCENT_FORM_SUCCESS,
);
