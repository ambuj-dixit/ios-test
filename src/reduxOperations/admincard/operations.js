import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setAdmitCardDetail} from './actions';

const noop = () => {};

const getAdmitCard =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setAdmitCardDetail(null));
    API.get(`Admit_Card?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setAdmitCardDetail(res.data.data));
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

const downloadAdmitCard =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(`Report_AdmitCardDownload?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data?.file) {
          successCallback(res?.data?.data?.file);
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

const downloadFeeReceipt =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(`Report_Fee_Receipt?${data}`)
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data?.file) {
          successCallback(res?.data?.data?.file);
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

const downloadFeeSumary =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(`Report_FeePrint_Summary?${data}`)
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data?.file) {
          successCallback(res?.data?.data?.file);
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

const downloadFeeSumaryForStudents =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(`Report_FeePrint_Summary_ForStudent?${data}`)
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data?.file) {
          successCallback(res?.data?.data?.file);
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
  getAdmitCard,
  downloadAdmitCard,
  downloadFeeReceipt,
  downloadFeeSumary,
  downloadFeeSumaryForStudents,
};
