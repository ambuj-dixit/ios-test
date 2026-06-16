import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setMarksheetData} from './actions';

const noop = () => {};

const getStudentMarksheet =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setMarksheetData(null));
    API.get(`StudentMarksheetDetail?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setMarksheetData(res.data.data));
          hideLoader();
        } else {
          hideLoader();
          failureCallback(res.data);
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const downloadStudentMarksheet =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `Report_MarksheetDownload?Studentid=${data?.StudentId}&StudentReg=${data.StudentReg}`,
    )
      .then(res => {
        console.log('res', res.data);
        if (res?.data?.status === 'Success' && res?.data?.data?.file) {
          successCallback(res?.data?.data?.file);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        console.log('err', err);
        hideLoader();
        failureCallback(err);
      });
  };

export default {getStudentMarksheet, downloadStudentMarksheet};
