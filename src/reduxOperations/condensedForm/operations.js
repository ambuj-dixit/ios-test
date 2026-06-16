import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {
  setCondensedSubjectDetail,
  setPayAmount,
  setSavedPaymentData,
} from './actions';

const noop = () => {};

const getAmountPayStatus =
  (studentId, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.get(`Condensedform_Amount_payorNotCheck?Studentid=${studentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data);
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

const getAmountPay = data => dispatch => {
  showLoader();
  dispatch(setPayAmount(null));

  API.get(
    `Condensedform_payAmount?Studentid=${data.StudentId}&CourseID=${data.CourseID}`,
  )
    .then(res => {
      if (res?.data?.status === 'Success') {
        hideLoader();
        dispatch(setPayAmount(res.data.data));
      } else {
        hideLoader();
      }
    })
    .catch(() => {
      hideLoader();
    });
};

const getSavedPaymentData =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSavedPaymentData(null));

    API.post('CondensedForm_SavedPaymentDetail', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        console.log(res.data);
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        console.log(err);
        hideLoader();
        failureCallback();
      });
  };

const getCondensedSubjectDetail = data => dispatch => {
  showLoader();
  dispatch(setCondensedSubjectDetail(null));

  API.get(
    `CondensedSubjectDetail?Studentid=${data.StudentId}&semesterId=${data.CurrentSemID}&specId=${data.Specialization}&CourseId=${data.CourseID}&Batch=${data.SessionID}`,
  )
    .then(res => {
      if (res?.data?.status === 'Success') {
        hideLoader();
        dispatch(setCondensedSubjectDetail(res.data.data));
      } else {
        hideLoader();
      }
    })
    .catch(() => {
      hideLoader();
    });
};

const getFormDetailPrint =
  (studentid, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.get(`CondensedFormDetailPrint?Studentid=${studentid}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data.data);
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(() => {
        hideLoader();
        failureCallback();
      });
  };

const updateSubjectStatus =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.post('CondensedSubjectInsertUpdate', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        console.log(res.data);
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        console.log(err);
        hideLoader();
        failureCallback();
      });
  };

const getCondensedReceiptData =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.get(
      `CondensedFormPaidReceipt?Studentid=${data.studentid}&Receipt_No=${data.receiptNo}`,
    )
      .then(res => {
        console.log(res.data);
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data.data);
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        console.log('err', err);
        hideLoader();
        failureCallback();
      });
  };

export default {
  getAmountPayStatus,
  getAmountPay,
  updateSubjectStatus,
  getSavedPaymentData,
  getCondensedSubjectDetail,
  getFormDetailPrint,
  getCondensedReceiptData,
};
