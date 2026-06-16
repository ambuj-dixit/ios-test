import {createActions} from 'redux-actions';
import types from './types';

export const {setProfileData, setCourseRegistrationData} = createActions(
  types.SET_PROFILE_DATA,
  types.SET_COURSE_REGISTRATION_DATA,
);
