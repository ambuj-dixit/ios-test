import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {
  setFeeDueDetail,
  setReceiptDetail,
  setVoucherDetail,
  setPrevTransactionDetail,
  setPostPaymentResponse,
  setStudentFeeHeadVoucharDetail,
} from './actions';

const noop = () => {};

const getFeeDueDetail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setFeeDueDetail(null));
    API.get(`StudentDueFeeDetails?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setFeeDueDetail(res.data.data));
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
const getVoucherDetail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setVoucherDetail(null));
    API.get(`StudentFeeVoucherDetails?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setVoucherDetail(res.data.data));
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

const getReceiptDetail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setReceiptDetail(null));
    API.get(`StudentPreviousReceiptDetails?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setReceiptDetail(res.data.data));
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

const getPrevTransactionDetail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setPrevTransactionDetail(null));
    API.get(`StudentPreviousTransactionDetails?Studentid=${data?.StudentId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setPrevTransactionDetail(res.data.data));
          hideLoader();
          successCallback();
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

const postPaymentResponseUpdate =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setPostPaymentResponse(null));
    API.post('Online_FeesubmissionThroughGateway', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        console.log("feessubmission",res);
        
        if (res?.data?.status === 'Success') {
          console.log('respostPaymentResponseUpdate', res.data);
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

const postPaymentDetails =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setPostPaymentResponse(null));
    API.post('FillActivityLog_Student', data, {
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

const getStudentFeeHeadVoucharDetail =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    dispatch(setStudentFeeHeadVoucharDetail(null));

    API.get(
      `StudentFeeHeadVoucharDetail?studentid=${data.StudentId}&VoucherNo=${data.voucherNo}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success' && res.data.data) {
          successCallback(res.data.data);
          dispatch(setStudentFeeHeadVoucharDetail(res.data.data));
        } else {
          hideLoader();
          failureCallback(res.data);
        }
      })
      .catch(err => {
        failureCallback();
      });
  };

  const CashfreeOrderAndTokenGeneration =
    (data, successCallback = noop, failureCallback = noop) =>
    dispatch => {
      showLoader();
      dispatch(setPostPaymentResponse(null));
      API.post('CashfreeOrderAndTokenGeneration', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(res => {
          if (res?.data?.status === 'Success') {
            console.log("baswurl",res.config.baseURL);
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
    const CCAvenuePaymentRequestGeneration =
      (data, successCallback = noop, failureCallback = noop) =>
      dispatch => {
        showLoader();
        dispatch(setPostPaymentResponse(null));
        API.post('CCAvenuePaymentRequestGeneration', data, {
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
  getFeeDueDetail,
  getVoucherDetail,
  getReceiptDetail,
  getPrevTransactionDetail,
  downloadAdmitCard,
  postPaymentResponseUpdate,
  postPaymentDetails,
  getStudentFeeHeadVoucharDetail,
  CashfreeOrderAndTokenGeneration,
  CCAvenuePaymentRequestGeneration,
};
