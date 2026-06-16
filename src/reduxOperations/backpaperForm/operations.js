import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {
  setBackPaperAmount,
  setBackPaperExamName,
  setBackPaperGrades,
  setBackPaperSemesters,
  setBackPaperSubjects,
} from './actions';

const noop = () => {};

const getBackPaperFormExamStatus =
  (studentid, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.get(`BackPaperForm_ExamStatusCheck?Studentid=${studentid}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback();
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

const getBackPaperexamName = data => dispatch => {
  showLoader();
  dispatch(setBackPaperExamName([]));
  API.get(
    `BackPaperForm_GetExamName?Studentid=${data.StudentId}&courseID=${data.CourseID}`,
  )
    .then(res => {
      if (res?.data?.status === 'Success') {
        dispatch(setBackPaperExamName(res.data.data));
        hideLoader();
      } else {
        hideLoader();
      }
    })
    .catch(err => {
      console.log('err', err);
      hideLoader();
    });
};

const getBackPaperGrade = data => dispatch => {
  showLoader();
  dispatch(setBackPaperGrades([]));
  API.get(`BackPaperForm_GetGrade?Studentid=${data.StudentId}`)
    .then(res => {
      if (res?.data?.status === 'Success') {
        dispatch(setBackPaperGrades(res.data.data));
        hideLoader();
      } else {
        hideLoader();
      }
    })
    .catch(() => {
      hideLoader();
    });
};

const getSemesters = data => dispatch => {
  showLoader();
  dispatch(setBackPaperSemesters([]));
  API.get(
    `BackPaperForm_GetSemesters?Studentid=${data.StudentId}&CourseID=${data.CourseID}&ExamName=${data.ExamName}`,
  )
    .then(res => {
      if (res?.data?.status === 'Success') {
        hideLoader();
        dispatch(setBackPaperSemesters(res.data.data));
      } else {
        hideLoader();
      }
    })
    .catch(err => {
      console.log('err', err);
      hideLoader();
    });
};

const getBackPaperSubjects =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setBackPaperSubjects([]));

    API.get(
      `BackPaperForm_Subjects?Studentid=${data.StudentId}&ddlSemesterYear=${data.ddlSemesterYear}&CourseId=${data.CourseID}&SpecilizationID=${data.Specialization}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          dispatch(setBackPaperSubjects(res.data.data));
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

const getBackPaperPaidSubjects =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `BackPaperForm_Student_paidSubject?Studentid=${data.StudentId}&CourseId=${data.CourseID}&ExamName=${data.ExamName}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data);
        } else {
          hideLoader();
        }
      })
      .catch(err => {
        console.log('err', err);
        hideLoader();
      });
  };

const getBackPaperUnPaidSubjects =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `BackPaperForm_Student_UnpaidSubject?Studentid=${data.StudentId}&CourseId=${data.CourseID}&ExamName=${data.ExamName}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data);
        } else {
          hideLoader();
        }
      })
      .catch(err => {
        console.log('err', err);
        hideLoader();
      });
  };

const getBackFormAmount = data => dispatch => {
  dispatch(setBackPaperAmount(null));
  API.get(
    `BackPaperForm_GetAmount?Studentid=${data.StudentId}&CourseID=${data.CourseID}`,
  )
    .then(res => {
      if (res?.data?.status === 'Success') {
        dispatch(setBackPaperAmount(res?.data?.data?.PerSubjectAmount));
        hideLoader();
      } else {
        hideLoader();
      }
    })
    .catch(err => {
      console.log('err', err);
      hideLoader();
    });
};

const insertUpdate =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    API.post('BackPaperForm_SubjectInsertUpdate', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        hideLoader();
        if (res?.data?.status === 'Success') {
          successCallback(res.data);
        } else {
          failureCallback();
        }
      })
      .catch(() => {
        hideLoader();
        failureCallback();
      });
  };

const savePaymentData =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.post('BackPaperForm_SavedPaymentDetail', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
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

const getSubjectReceipt =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `BackPaperForm_PaidSubjectDetail_Receipt?Studentid=${data.StudentId}&ReceiptNo=${data.ReceiptNo}`,
      data,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data?.data?.file);
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

const getReportData =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `BackPaperForm_SubjectDetailDownloadReport?Studentid=${data.StudentId}&ExamName=${data.ExamName}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          hideLoader();
          successCallback(res.data?.data?.file);
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

export default {
  insertUpdate,
  getBackPaperFormExamStatus,
  getBackPaperexamName,
  getBackPaperGrade,
  getSemesters,
  getBackPaperSubjects,
  getBackPaperUnPaidSubjects,
  getBackPaperPaidSubjects,
  getBackFormAmount,
  getReportData,
  savePaymentData,
  getSubjectReceipt,
};
