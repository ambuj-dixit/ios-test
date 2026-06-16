/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import NoticesAndCircularView from './NoticesAndCircularView';
import commonFunctions from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {useIsFocused} from '@react-navigation/native';

const NoticesAndCircularViewContainer = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
        InstituteID: props.userDetails.InstituteID,
      };
      const successCallback = () => {};
      const failureCallback = () => {};
      dispatch(
        dashboardOperations.getNoticesAndCirculars(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  return (
    <NoticesAndCircularView
      navigation={props.navigation}
      noticesAndCirculars={props.noticesAndCirculars}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  noticesAndCirculars: state.dashboard.noticesAndCirculars,
});

export default connect(mapStateToProps)(NoticesAndCircularViewContainer);
