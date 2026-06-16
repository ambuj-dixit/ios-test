import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import commonFunctions from '../../utils';
import {
  setAcademicDetails,
  setDashboardData,
  setInstituteDetails,
  setNoticesAndCirculars,
  setFacultyDashboardData,
  setFacultyDashboardDataNav,
  setNotifications,
} from './actions';

const noop = () => {};

const getNotifications =
  (data, successCallback = noop, failureCallback = noop) =>
  (dispatch, getState) => {
    showLoader();
    const {userDetails} = getState().login;

    const isStudent = !!userDetails?.StudentId;
    const type = isStudent ? 's' : 'f';
    const id = isStudent ? userDetails?.StudentId : (userDetails?.Empid || userDetails?.EmpId);

    if (!id) {
      hideLoader();
      return;
    }

    const url = `ERPInAppNotifications?Studentid=${id}&type=${type}`;

    API.get(url)
      .then(res => {
        if (res?.data?.status === 'Success' && res.data.Data) {
          dispatch(setNotifications(res.data.Data));
          hideLoader();
          successCallback(res.data);
        } else if (res?.data?.status === 'Success' && Array.isArray(res.data.data)) {
          dispatch(setNotifications(res.data.data));
          hideLoader();
          successCallback(res.data);
        } else {
          dispatch(setNotifications([]));
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getDashboardDetails =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setDashboardData(null));
    API.get(`GetItemNavigationBar?instid=${data}`)
      .then(res => {
        if (res?.data?.status === 'Success' && Array.isArray(res.data.data)) {
          dispatch(
            setDashboardData(
              commonFunctions.groupDashboardItems(res.data.data),
            ),
          );
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

  const getFacultyDashboardNavigation =
    (data, successCallback = noop, failureCallback = noop) =>
    dispatch => {
      showLoader();
      dispatch(setFacultyDashboardDataNav(null));

      API.get(`GetItemNavigationForFaculty?Empid=${data?.empId}&instid=${data?.instid}`)
        .then(res => {
          if (res?.data?.status === 'Success') {
            dispatch(
              setFacultyDashboardDataNav(
                commonFunctions.groupDashboardItems(res.data.data),
              ),
            );
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

const getNoticesAndCirculars =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `Notice_and_Circulars?instid=${data.InstituteID}&Studentid=${data.Studentid}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success' && Array.isArray(res.data.data)) {
          dispatch(setNoticesAndCirculars(res.data.data));
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

const getAcademicDetails = data => dispatch => {
  showLoader();

  API.get(`Student_Academic_Details?Studentid=${data.StudentId}`)
    .then(res => {
      if (res?.data?.status === 'Success') {
        dispatch(setAcademicDetails(res?.data?.data));
        hideLoader();
      } else {
        hideLoader();
      }
    })
    .catch(err => {
      hideLoader();
    });
};

const changePassword =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.post(
      `Change_Password`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback(res.data);
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

const getInstitueDetails =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    setInstituteDetails(null);

    API.get(`Institute_Details?Instituteid=${data}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setInstituteDetails(res.data.data));
        }
      })
      .catch(err => {});
  };

const getFacultyDashboardDetails =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setFacultyDashboardData(null));
    API.get(
      `EmployeeProfile?Empid=${data?.empId}&InstituteID=${data?.instituteId}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setFacultyDashboardData(res.data.data));
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
  getDashboardDetails,
  getFacultyDashboardNavigation,
  getNoticesAndCirculars,
  getAcademicDetails,
  changePassword,
  getInstitueDetails,
  getFacultyDashboardDetails,
  getNotifications,
};
