import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setConcentFormData} from './actions';

const noop = () => {};

const getConcentForm =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setConcentFormData(null));
    API.post(`Consent_Form`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setConcentFormData(res.data));
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

export default {getConcentForm};
