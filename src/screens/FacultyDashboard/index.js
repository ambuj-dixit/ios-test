/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import DashboardView from './dashboardView';
import {connect, useDispatch} from 'react-redux';
import {useIsFocused, CommonActions, useFocusEffect} from '@react-navigation/native';
import {globalConstants} from '../../constants';
import {BackHandler, Alert} from 'react-native';
import {userLogout} from '../../reduxOperations/dashboard/actions';
import commonFunctions from '../../utils';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {facultyAttendanceOperations} from '../../reduxOperations/facultyAttendance';
import {getOneTimeLocation} from '../../utils/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardContainer = props => {
  const dispatch = useDispatch();

  const focused = useIsFocused();

  const [attendance, setAttendance] = useState(null);
  console.log('dashboardDetails++++++', props.facultyDashboardDataNav);

  const [isLocationModalVisible, setisLocationModalVisible] = useState(false);

  useEffect(() => {
    if (focused) {
      getFacultyDetails();
      getFacultyDashboardNavigation();
      dispatch(dashboardOperations.getNotifications());
    }
  }, [focused]);

  const onRefresh = () => {
    getFacultyDetails();
    getFacultyDashboardNavigation();
    dispatch(dashboardOperations.getNotifications());
  };

  const getFacultyDashboardNavigation = () => {
    const failureCallback = err => {
      commonFunctions.showErrorMessage('Error while fetching faculty details');
    };

    let payload = {
      empId: props.userDetails.Empid,
      instid: props.userDetails.InstituteID,
    };
    console.log('====================================');
    console.log('payload', payload);
    console.log('====================================');

    dispatch(
      dashboardOperations.getFacultyDashboardNavigation(
        payload,
        () => {},
        failureCallback,
      ),
    );
  };

  const getFacultyDetails = () => {
    const failureCallback = err => {
      commonFunctions.showErrorMessage('Error while fetching faculty details');
    };

    let payload = {
      empId: props.userDetails.Empid,
      instituteId: props.userDetails.InstituteID,
    };

    dispatch(
      dashboardOperations.getFacultyDashboardDetails(
        payload,
        () => {},
        failureCallback,
      ),
    );

    const scb = () => {};
    const fcb = () => {};

    dispatch(
      dashboardOperations.getInstitueDetails(
        props.userDetails.InstituteID,
        scb,
        fcb,
      ),
    );
    getAttendanceDetail();
  };

  const getAttendanceDetail = () => {
    let payload = {
      empId: props.userDetails.Empid,
      instituteId: props.userDetails.InstituteID,
    };
    const successGetAttendance = res => {
      setAttendance(res);
    };
    const failureGetAttendance = () => {};

    dispatch(
      facultyAttendanceOperations.getAttendance(
        payload,
        successGetAttendance,
        failureGetAttendance,
      ),
    );
  };

  const handleClockIn = async () => {
    await getOneTimeLocation()
      .then(res => {
        let payload = {
          Empid: props.userDetails.Empid,
          instID: props.userDetails.InstituteID,
          sesnID: props.userDetails.session,
          Latitude: res?.lat,
          Longitude: res?.lng,
          Location: '',
        };

        const success = res => {
          commonFunctions.showSuccessMessage(res);
          getAttendanceDetail();
        };
        const failure = err => {
          commonFunctions.showErrorMessage(err);
        };

        dispatch(
          facultyAttendanceOperations.postAttendance(payload, success, failure),
        );
      })
      .catch(e => {
        commonFunctions.showErrorMessage(e.msg);
      });
  };

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
              // dispatch(userLogout());
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('facltyData');
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

  const handleNavigate = name => {
    if (globalConstants.default.routeNames[name]) {
      props?.navigation?.navigate(globalConstants.default.routeNames[name]);
    }
  };

  return (
    <DashboardView
      navigation={props.navigation}
      handleNavigate={handleNavigate}
      dashboardDetails={props.dashboardDetails}
      // facultyDashboardDataNav={props.facultyDashboardDataNav}
      instituteDetails={props.instituteDetails}
      attendance={attendance}
      handleClockIn={handleClockIn}
      onRefresh={onRefresh}
      isLocationModalVisible={isLocationModalVisible}
      setisLocationModalVisible={setisLocationModalVisible}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.facultyDashboardData,
  // facultyDashboardDataNav: state.dashboard.facltyDashbordDataNav,
  instituteDetails: state.dashboard.instituteDetails,
  attendance: state.facultyAttendance.facultyAttendance,
});

export default connect(mapStateToProps)(DashboardContainer);
