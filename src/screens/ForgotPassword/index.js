import React, {useState} from 'react';

import ResetPassword from './ResetPassword';
import {connect, useDispatch} from 'react-redux';
import {forgotPasswordOperations} from '../../reduxOperations/ForgotPassword';
import commonFunctions from '../../utils';

const ForgotPasswordContainer = props => {
  const dispatch = useDispatch();
  const [regId, setRegId] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    regId: '',
    email: '',
  });

  const handleSubmit = () => {
    let count = 0;
    if (regId == 0) {
      setErrorMsg(d => ({...d, regId: 'Registration number is required'}));
      commonFunctions.showErrorMessage('Registration number is required');
      count++;
    }

    if (email == '') {
      setErrorMsg(d => ({...d, email: 'Email is required'}));
      commonFunctions.showErrorMessage('Email is required');
      count++;
    }

    if (count > 0) {
      setErrorMsg({
        email: '',
        regId: '',
      });
    } else {
      let payload = {
        Reg_No: regId,
        Registered_Email: email,
      };
      const onSuccess = res => {
        if (res) {
          commonFunctions.showSuccessMessage(res.message, () => {
            props.navigation.navigate('VerifyOtp', {regId: regId});
          });
        }
      };

      const onFailure = err => {
        if (err?.message) {
          commonFunctions.showErrorMessage(err.message);
        } else {
          commonFunctions.showErrorMessage(
            'Something went wrong. Please try again',
          );
        }
      };

      dispatch(
        forgotPasswordOperations.verifyStudentEmail(
          payload,
          onSuccess,
          onFailure,
        ),
      );
    }
  };

  return (
    <ResetPassword
      regId={regId}
      setRegId={setRegId}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      navigation={props.navigation}
      error={errorMsg}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
});

export default connect(mapStateToProps)(ForgotPasswordContainer);
