import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {
  StudentLogin,
  Profile,
  StudentDashboard,
  CourseRegistration,
  ConcentForm,
  NoticesAndCircular,
  GatePassRequest,
  ChangePassword,
  ForgotPassword,
  InstituteCode,
  SelectUserType,
  AttendanceSubjectWise,
  DetailedAttendance,
  FacultyLogin,
  FacultyDashboard,
  FacultyProfile,
  AddAttedance,
  AttedanceList,
  CodensedFormFee,
  Backpaperform,
  ComingSoon,
  Notifications,
  HostelLeaveDashboard,
  HostelLeaveForm,
  DayOutDashboard,
  DayOutForm,
  FeeSetup,
} from '../screens';
import Marksheet from '../screens/Marksheet';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {home, server, userIcon} from '../assets/images';
import styles from './navigatonStyles';
import {globalConstants} from '../constants';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {indent} from '../styles/dimensions';
import FeeDetail from '../screens/FeeDetail';
import AdmintCard from '../screens/AdmintCard';
import PayFee from '../screens/PayFee';

import VerifyOTP from '../screens/ForgotPassword/VerifyOtp/';
import UpdatePassword from '../screens/ForgotPassword/UpdatePassword';
import Transport from '../screens/Transport';
import Hostel from '../screens/Hostel';
import AttendanceView from '../screens/AttendanceView';
import WebViewScreen from '../screens/Webview';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        unmountOnBlur: false,
      }}>
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={home}
              style={[
                styles.image,
                {tintColor: focused ? colors.blue : colors.black},
              ]}
            />
          ),
        }}
        name="studentDashboard"
        component={StudentDashboard}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="notification"
              color={focused ? colors.blue : colors.black}
              style={styles.image}
              size={indent * 1.3}
            />
          ),
        }}
        name="notices"
        component={NoticesAndCircular}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="calendar"
              color={focused ? colors.blue : colors.black}
              style={styles.image}
              size={indent * 1.3}
            />
          ),
        }}
        name="attendance"
        component={AttendanceSubjectWise}
      />
      <BottomTab.Screen
        name="profileTab"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={userIcon}
              style={[
                styles.image,
                {tintColor: focused ? colors.blue : colors.black},
              ]}
            />
          ),
        }}
        component={Profile}
      />
    </BottomTab.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        unmountOnBlur: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      backBehavior="history">

      {/* The Bottom Tabs are now the primary screen of the Drawer */}
      <Drawer.Screen name="mainTabs" component={BottomTabNavigator} />

      {/* Other Drawer Screens */}
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen
        name={globalConstants.default.routeNames.GATE_PASS_REQUEST}
        component={GatePassRequest}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.BACK_PAPER_FORM}
        component={Backpaperform}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.CONDENSED_FORM_FEE}
        component={CodensedFormFee}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.CONSENT_FORM}
        component={ConcentForm}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.STUDENT_MARKSHEET_DETAILS}
        component={Marksheet}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.ADMIT_CARD}
        component={AdmintCard}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.TRANSPORT_CARD}
        component={Transport}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.HOSTEL_CARD}
        component={Hostel}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.Attendance_VIEW}
        component={AttendanceView}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.COURSE_REGISTRATION}
        component={CourseRegistration}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.FEE_PAY}
        component={FeeDetail}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.PAYMENT_FORM}
        component={PayFee}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.ATTENDANCE_SUBJECT_WISE}
        component={AttendanceSubjectWise}
      />
      <Drawer.Screen name="AttendanceDetails" component={DetailedAttendance} />
      <Drawer.Screen name="facultyDashboard" component={FacultyDashboard} />
      <Drawer.Screen
        name={globalConstants.default.routeNames.FACULTY_PROFILE}
        component={FacultyProfile}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.ADD_STUDENT_ATTENDANCE}
        component={AddAttedance}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.STUDENT_ATTENDANCE}
        component={AttedanceList}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.Webview}
        component={WebViewScreen}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.NOTIFICATIONS}
        component={Notifications}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.HOSTEL_LEAVE}
        component={HostelLeaveDashboard}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.ADD_HOSTEL_LEAVE}
        component={HostelLeaveForm}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.DAY_OUT}
        component={DayOutDashboard}
      />
      <Drawer.Screen
        name={globalConstants.default.routeNames.ADD_DAY_OUT}
        component={DayOutForm}
      />
      <Drawer.Screen name="ComingSoon" component={ComingSoon} />
    </Drawer.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="institudeCode">
      <Stack.Screen name="selectUserType" component={SelectUserType} />
      <Stack.Screen name="institudeCode" component={InstituteCode} />
      <Stack.Screen name="studentLogin" component={StudentLogin} />
      <Stack.Screen name="facultyLogin" component={FacultyLogin} />
      <Stack.Screen name="feeSetup" component={FeeSetup} />
      <Stack.Screen name="main" component={AppDrawer} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOTP} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
