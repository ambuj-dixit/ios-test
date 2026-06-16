import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {showErrorMessage,printDataForBase64} from '../../utils/commonFunctions';
import TransportCardView from './TransportCardView';
import { transportOperations } from '../../reduxOperations/Transport';

const TransportDetailsContainer = props => {
  const dispatch = useDispatch();
  const [transportDetails, setTransportDetails] = useState(null);
  const [feesDetails, setFeesDetails] = useState(null);


  useEffect(() => {
    const payload = {
      Studentid: props.userDetails?.StudentId,
      InstituteID: props.userDetails.InstituteID,
    };
    const successCallback = data => {
      setTransportDetails(data.Transport_Detail);
      setFeesDetails(data.Transport_Fees_Detail);
    };
    const failureCallback = () => {
      showErrorMessage('Failed to fetch transport details');
    };
    dispatch(transportOperations.getTransportDetails(payload, successCallback, failureCallback));
  }, [props.userDetails]);

  const handlePrint = () => {
      if (props.userDetails) {
        const payload = {
          Studentid: props.userDetails?.StudentId,
        };
  
        const successCallback = res => {
          if (res) {
            printDataForBase64(res, 'Bus Pass');
          }
        };
        const failureCallback = () => {
          showErrorMessage('Error while downloading file!!');
        };
        dispatch(
          transportOperations.downloadBUSPass(
            payload,
            successCallback,
            failureCallback,
          ),
        );
      }
    };
 

  return (
    <TransportCardView
      transportDetails={transportDetails}
      feesDetails={feesDetails}
      handlePress={handlePrint}
      navigation={props.navigation}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
});

export default connect(mapStateToProps)(TransportDetailsContainer);

