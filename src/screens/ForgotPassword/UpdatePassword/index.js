import React, {useEffect, useState} from 'react';

import UpdatePassword from './UpdatePassword';
import {connect, useDispatch} from 'react-redux';
import commonFunctions from '../../../utils';
import {forgotPasswordOperations} from '../../../reduxOperations/ForgotPassword';

const UpdatePasswordContainer = props => {
  const dispatch = useDispatch();

  const [regId, setRegId] = useState(2303482);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    regId: '',
    password: '',
    conPassword: '',
  });

  const handleSubmit = () => {
    let count = 0;

    if (!regId) {
      setErrorMsg(d => ({...d, regId: 'Registration no. is required'}));
      commonFunctions.showErrorMessage('Registration no. is required');
      count++;
    }
    if (!password) {
      setErrorMsg(d => ({...d, regId: 'Password is required'}));
      commonFunctions.showErrorMessage('Password is required');
      count++;
    }
    if (!confirmPassword) {
      setErrorMsg(d => ({...d, conPassword: 'Confirm Password is required'}));
      commonFunctions.showErrorMessage('Confirm Password is required');
      count++;
    }

    if (password != confirmPassword) {
      commonFunctions.showErrorMessage('Password did not match');
      count++;
    }

    if (count == 0) {
      setErrorMsg({
        regId: '',
        password: '',
        conPassword: '',
      });

      let payload = {
        Reg_No: regId,
        Password: password,
      };
      const onSuccess = res => {
        if (res) {
          commonFunctions.showSuccessMessage(res.message, () => {
            props.navigation.navigate('login');
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
        forgotPasswordOperations.resetPassword(payload, onSuccess, onFailure),
      );
    } else {
    }
  };

  useEffect(() => {
    let studentRegId = props.route?.params?.regId ?? 0;
    setRegId(studentRegId);
  });

  return (
    <UpdatePassword
      regId={regId}
      setRegId={setRegId}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
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

export default connect(mapStateToProps)(UpdatePasswordContainer);
