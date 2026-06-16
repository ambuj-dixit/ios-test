import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {showErrorMessage} from '../../utils/commonFunctions';
import HostelCardView from './HostelCardView';
import { hostelOperations } from '../../reduxOperations/Hostel';

const HostelDetailsContainer = props => {
  const dispatch = useDispatch();
  const [hostelDetails, setHostelDetails] = useState(null);
  const [feesDetails, setFeesDetails] = useState(null);

  useEffect(() => {
    const payload = {
      Studentid: props.userDetails?.StudentId,
      InstituteID: props.userDetails.InstituteID,
    };
    const successCallback = data => {
      setHostelDetails(data.Hotel_Detail);
      setFeesDetails(data.Hostel_Fees_Detail);
    };
    const failureCallback = () => {
      showErrorMessage('Failed to fetch transport details');
    };
    dispatch(hostelOperations.getHostelDetails(payload, successCallback, failureCallback));
  }, [props.userDetails]);

  return (
    <HostelCardView
      hostelDetails={hostelDetails}
      feesDetails={feesDetails}
      navigation={props.navigation}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
});

export default connect(mapStateToProps)(HostelDetailsContainer);
