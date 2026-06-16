import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setSubjectAttendance} from './actions';

const noop = () => {};
const getSubjectWiseAttendance =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSubjectAttendance(null));
    API.get(
      `Subject_Wise_Attendance?Studentid=${data.studentId}&SemesterId=${data.CurrentSemID}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {

          dispatch(setSubjectAttendance(res.data.data));
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

const getAttendanceSubjectWise =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSubjectAttendance(null));
    API.get(
      `Student_Attendance_SubjectWise?Studentid=${data.studentId}&SubjectID=${data.SubjectID}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback(res);
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

export default {
  getSubjectWiseAttendance,
  getAttendanceSubjectWise,
};
