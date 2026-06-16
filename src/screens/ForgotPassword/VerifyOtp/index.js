import React, {useState} from 'react';
import {connect} from 'react-redux';
import ResetPassword from '../ResetPassword';
import VerifyOTP from './VerifyOTP';
import commonFunctions from '../../../utils';

const VerifyOtpcontainer = props => {
  const [otp, setOtp] = useState(0);

  const [errorMsg, setErrorMsg] = useState({
    otp: '',
  });

  const handleSubmit = () => {
    let count = 0;

    if (otp == 0) {
      setErrorMsg(d => ({...d, otp: 'OTP is required'}));
      commonFunctions.showErrorMessage('OTP is required');
      count++;
    }

    if (count == 0) {
      setErrorMsg({
        otp: '',
      });
      if (props.otpDetail?.otpDetails?.OTP == otp) {
        let regId = props.route?.params?.regId;
        commonFunctions.showSuccessMessage('OTP Verified', () => {
          props.navigation.navigate('UpdatePassword', {regId: regId});
        });
      } else {
        commonFunctions.showErrorMessage('Invalid OTP');
      }
    } else {
    }
  };

  return (
    <VerifyOTP
      otp={otp}
      setOtp={setOtp}
      handleSubmit={handleSubmit}
      navigation={props.navigation}
      error={errorMsg}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
  otpDetail: state.forgotPassword,
});

export default connect(mapStateToProps)(VerifyOtpcontainer);
