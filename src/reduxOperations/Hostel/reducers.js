const initialState = {
  profileData: null,
  courseRegistrationData: null,
  hostelData: null,
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
    [types.SET_HOSTEL_DATA]: (state, { payload }) => ({
      ...state,
      hostelData: payload,
    }),
  },
  initialState
);

export default profileReducer;
