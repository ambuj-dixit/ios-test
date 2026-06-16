/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback} from 'react';
import DashboardView from './dashboardView';
import commonFunctions from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {feeDetailOperations} from '../../reduxOperations/feedetail';
import {useIsFocused, CommonActions, useFocusEffect} from '@react-navigation/native';
import {globalConstants} from '../../constants';
import {BackHandler, Alert} from 'react-native';
import {profileOperations} from '../../reduxOperations/profile';
import {userLogout} from '../../reduxOperations/dashboard/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardContainer = props => {
  const dispatch = useDispatch();
  const focused = useIsFocused();

  // Safely extract user details for robust rendering
  const user = props.userDetails;
  const studentId = user?.StudentId || user?.Studentid || user?.StudentID;
  const instituteId = user?.InstituteID || user?.Instituteid || user?.InstID;

  useEffect(() => {
    if (focused && studentId && studentId !== 'undefined') {
      const failureCallback = () => {
        commonFunctions.showErrorMessage('Error while fetching user details');
      };

      const payload = {
        StudentId: studentId,
        InstituteID: instituteId,
      };

      // Parallelize API calls for Play Store level performance
      dispatch(dashboardOperations.getDashboardDetails(instituteId, () => {}, failureCallback));
      dispatch(dashboardOperations.getInstitueDetails(instituteId));
      dispatch(profileOperations.getProfileData(payload));
      dispatch(dashboardOperations.getAcademicDetails(payload));
      dispatch(feeDetailOperations.getFeeDueDetail({ StudentId: studentId }));
    }
  }, [focused, studentId]);

  useFocusEffect(
    useCallback(() => {
      // If user presses back button on android
      // show confirm alert for logout
      const backAction = () => {
        Alert.alert('ESIM', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: async () => {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('facltyData');
              // dispatch(userLogout());
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'institudeCode'}],
                }),
              );
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [props.navigation]),
  );

  const onCardPress = event => {
    if (globalConstants.default.routeNames[event?.routeNames]) {
      props?.navigation?.navigate(
        globalConstants.default.routeNames[event.routeNames],
      );
    }
  };

  const dashboardItems = [
    {
      routeNames: 'ATTENDANCE_SUBJECT_WISE',
      ClassName: 'verifiedUser',
      Title: 'Attendance',
    },
    {routeNames: 'FEE_PAY', ClassName: 'rupee', Title: 'FeePay'},
    {
      routeNames: 'Attendance',
      ClassName: 'calendar-times-o',
      Title: 'Time Table',
    },
  ];

  return (
    <DashboardView
      navigation={props.navigation}
      dashboardItems={dashboardItems}
      onCardPress={onCardPress}
      instituteDetails={props.instituteDetails}
      academicDetails={props.academicDetails}
      profileData={props.profileData}
      feeDueDetail={props.feeDueDetail}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  instituteDetails: state.dashboard.instituteDetails,
  academicDetails: state.dashboard.academicDetails,
  profileData: state.profile.profileData,
  feeDueDetail: state.feeDetail?.feeDueDetail,
});

export default connect(mapStateToProps)(DashboardContainer);
