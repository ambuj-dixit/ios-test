import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';

import login from './login';
import dashboard from './dashboard';
import profile from './profile';
import marksheet from './marksheet';
import concentform from './ConcentForm';
import admitCard from './admincard';
import feeDetail from './feedetail';
import forgotPassword from './ForgotPassword';
import attendance from './attendance';
import facultyStudentAttendance from './facultyStudentAttendance';
import facultyAttendance from './facultyAttendance';
import condensedForm from './condensedForm';
import backpaperForm from './backpaperForm';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
  blacklist: ['dashboard'],
};

const appReducer = {
  login,
  dashboard,
  profile,
  marksheet,
  concentform,
  admitCard,
  feeDetail,
  forgotPassword,
  attendance,
  facultyStudentAttendance,
  facultyAttendance,
  backpaperForm,
  condensedForm,
};

export default persistCombineReducers(config, appReducer);
