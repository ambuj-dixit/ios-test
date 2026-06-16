import React from 'react';
import {connect} from 'react-redux';

import FacultyProfileView from './facultyProfileView';

function FacultyProfileContainer(props) {
  return (
    <FacultyProfileView
      employeeDetail={props.employeeDetail}
      navigation={props.navigation}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  employeeDetail: state.dashboard.facultyDashboardData,
});

export default connect(mapStateToProps)(FacultyProfileContainer);
