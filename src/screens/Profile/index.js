import React, {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {profileOperations} from '../../reduxOperations/profile';

import ProfileView from './profileView';

function ProfileContainer(props) {
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
        profileOperations.getProfileData(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and you will lose access to your student/faculty portal.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Request Sent',
              'Your deletion request has been logged. Please contact the Institute Admin or email support@mktsoftware.com to finalize the process.',
            );
          },
        },
      ],
    );
  };

  return (
    <ProfileView
      profileData={props.profileData}
      navigation={props.navigation}
      onDeleteAccount={onDeleteAccount}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(ProfileContainer);
