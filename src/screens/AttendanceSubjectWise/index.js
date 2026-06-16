import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {attedanceOperations} from '../../reduxOperations/attendance';
import AttendanceView from './AttendanceView';

const AttendanceContainer = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        studentId: props.userDetails.StudentId,
        InstituteID: props.userDetails.InstituteID,
        CurrentSemID: props.userDetails.CurrentSemID,
      };
      const onSuccess = () => {};
      const onFailure = () => {};
      dispatch(
        attedanceOperations.getSubjectWiseAttendance(
          payload,
          onSuccess,
          onFailure,
        ),
      );
    }
  }, []);

  const onCardPress = data => {
    props.navigation.navigate('AttendanceDetails', {...data});
  };

  return (
    <AttendanceView
      isLoading={props.isLoading}
      onCardPress={onCardPress}
      navigation={props.navigation}
      attendanceSubjectWise={props.attendanceSubjectWise}
      instituteDetails={props.instituteDetails}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  userDetails: state.login.userDetails,
  attendanceSubjectWise: state.attendance.attendanceSubjectWise,
  instituteDetails: state.dashboard.instituteDetails,
});

export default connect(mapStateToProps)(AttendanceContainer);
