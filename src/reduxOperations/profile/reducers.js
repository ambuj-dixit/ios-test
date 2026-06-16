import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  profileData: null,
  courseRegistrationData: null,
};

const profileReducer = handleActions(
  {
    [types.SET_PROFILE_DATA]: (state, {payload}) => ({
      ...state,
      profileData: payload,
    }),
    [types.SET_COURSE_REGISTRATION_DATA]: (state, {payload}) => ({
      ...state,
      courseRegistrationData: payload,
    }),
  },
  initialState,
);

export default profileReducer;
