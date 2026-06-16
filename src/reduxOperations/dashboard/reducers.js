import {handleActions} from 'redux-actions';

import types from './types';

const initialState = {
  dashboardData: [],
  facultyDashboardData: [],
  facltyDashbordDataNav: [],
  noticesAndCirculars: [],
  academicDetails: null,
  instituteDetails: null,
  notifications: [],
  unreadCount: 0,
};

const dashboardReducer = handleActions(
  {
    [types.SET_DASHBOARD_DATA]: (state, {payload}) => ({
      ...state,
      dashboardData: payload,
    }),
    [types.SET_NOTICES_AND_CIRCULARS]: (state, {payload}) => ({
      ...state,
      noticesAndCirculars: payload,
    }),
    [types.SET_ACADEMIC_DETAILS]: (state, {payload}) => ({
      ...state,
      academicDetails: payload,
    }),
    [types.SET_INSTITUTE_DETAILS]: (state, {payload}) => ({
      ...state,
      instituteDetails: payload,
    }),
    [types.USER_LOGOUT]: (state, {payload}) => ({
      ...initialState,
    }),
    [types.SET_FACULTY_DASHBOARD_DATA]: (state, {payload}) => ({
      ...state,
      facultyDashboardData: payload,
    }),
    [types.SET_FACULTY_DASHBOARD_DATA_NAV]: (state, {payload}) => ({
      ...state,
      facultyDashboardDataNav: payload,
    }),
    [types.SET_NOTIFICATIONS]: (state, {payload}) => {
      // Only update unreadCount if the data has actually changed (new notifications)
      const hasNewData = JSON.stringify(payload) !== JSON.stringify(state.notifications);
      return {
        ...state,
        notifications: payload,
        unreadCount: hasNewData ? (payload ? payload.length : 0) : state.unreadCount,
      };
    },
    [types.CLEAR_NOTIFICATIONS_COUNT]: state => ({
      ...state,
      unreadCount: 0,
    }),
  },
  initialState,
);

export default dashboardReducer;
