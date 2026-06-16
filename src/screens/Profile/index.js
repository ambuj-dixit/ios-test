import React, {useEffect, useRef, useState} from 'react';
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

  return (
    <ProfileView
      profileData={props.profileData}
      navigation={props.navigation}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(ProfileContainer);
