import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setEmailVerification, setResetPassword} from './actions';

const noop = () => {};

const verifyStudentEmail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setEmailVerification(null));
    API.get(
      `ForgotPassword_ByEmail?Reg_No=${data?.Reg_No}&Registered_Email=${data?.Registered_Email}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setEmailVerification(res.data.data));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback(res.data);
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err.data);
      });
  };

const resetPassword =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setResetPassword(null));
    API.post(`Forgot_Password`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

export default {
  verifyStudentEmail,
  resetPassword,
};
