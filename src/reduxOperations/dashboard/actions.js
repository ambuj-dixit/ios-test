import {createActions} from 'redux-actions';
import types from './types';

export const {
  setDashboardData,
  setNoticesAndCirculars,
  setAcademicDetails,
  setInstituteDetails,
  userLogout,
  setFacultyDashboardData,
  setFacultyDashboardDataNav,
  setNotifications,
  clearNotificationsCount,
} = createActions(
  types.SET_DASHBOARD_DATA,
  types.SET_NOTICES_AND_CIRCULARS,
  types.SET_ACADEMIC_DETAILS,
  types.SET_INSTITUTE_DETAILS,
  types.USER_LOGOUT,
  types.SET_FACULTY_DASHBOARD_DATA,
  types.SET_FACULTY_DASHBOARD_DATA_NAV,
  types.SET_NOTIFICATIONS,
  types.CLEAR_NOTIFICATIONS_COUNT,
);
