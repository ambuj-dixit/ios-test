import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setAttendance} from './actions';

const noop = () => {};

const postAttendance =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.post(`MarkAttendance`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback(res.data.message);
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

const getAttendance =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setAttendance(null));
    API.get(`ShowAttendance?Empid=${data?.empId}&instID=${data?.instituteId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setAttendance(res.data));
          successCallback(res.data?.data[0]);
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

export default {postAttendance, getAttendance};
