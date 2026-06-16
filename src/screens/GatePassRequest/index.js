import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {profileOperations} from '../../reduxOperations/profile';

import GatePassRequestView from './GatePassRequestView';

function GatePassContainer(props) {
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

  const handleDownload = () => {};

  return (
    <GatePassRequestView
      navigation={props.navigation}
      academicDetails={props.academicDetails}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  profileData: state.profile.profileData,
  academicDetails: state.dashboard.academicDetails,
});

export default connect(mapStateToProps)(GatePassContainer);
