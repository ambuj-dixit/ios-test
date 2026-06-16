/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import ChangepasswordView from './ChangepasswordView';
import commonFunctions from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/commonFunctions';
import {Keyboard} from 'react-native';

const ChangepasswordViewContainer = props => {
  const dispatch = useDispatch();
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmnewPassword, setconfirmnewPassword] = useState('');

  const handlePasswordChange = () => {
    let error = '';
    if (!currentPassword) {
      error = 'Please enter your current password';
    } else if (!newPassword) {
      error = 'Please enter new password';
    } else if (!confirmnewPassword) {
      error = 'Please enter confirm new password';
    } else if (!(newPassword === confirmnewPassword)) {
      error = 'Confirm password and new password do not match';
    } else {
    }

    if (error) {
      showErrorMessage(error);
    } else {
      const successCallback = res => {
        showSuccessMessage('Password changed. Please login again!');
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'login'}],
          }),
        );
      };
      const failureCallback = err => {
        let errMessage = err?.message;
        if (!errMessage) {
          errMessage = 'Please try again!';
        }
        showErrorMessage(errMessage);
      };
      const payload = {
        Studentid: props.userDetails.StudentId,
        OldPassword: currentPassword,
        NewPassword: newPassword,
      };
      dispatch(
        dashboardOperations.changePassword(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  };

  const resetPassword = () => {
    Keyboard.dismiss();
    setconfirmnewPassword('');
    setcurrentPassword('');
    setnewPassword('');
  };

  return (
    <ChangepasswordView
      currentPassword={currentPassword}
      setnewPassword={setnewPassword}
      setcurrentPassword={setcurrentPassword}
      setconfirmnewPassword={setconfirmnewPassword}
      confirmnewPassword={confirmnewPassword}
      newPassword={newPassword}
      handlePasswordChange={handlePasswordChange}
      resetPassword={resetPassword}
      navigation={props.navigation}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  profileData: state.profile.profileData,
  dashboardDetails: state.dashboard.dashboardData,
  academicDetails: state.dashboard.academicDetails,
});

export default connect(mapStateToProps)(ChangepasswordViewContainer);
