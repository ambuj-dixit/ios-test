const initialState = {
  profileData: null,
  courseRegistrationData: null,
  transportData: null,
};

const profileReducer = handleActions(
  {
    [types.SET_PROFILE_DATA]: (state, { payload }) => ({
      ...state,
      profileData: payload,
    }),
    [types.SET_COURSE_REGISTRATION_DATA]: (state, { payload }) => ({
      ...state,
      courseRegistrationData: payload,
    }),
    [types.SET_TRANSPORT_DATA]: (state, { payload }) => ({
      ...state,
      transportData: payload,
    }),
  },
  initialState
);

export default profileReducer;
