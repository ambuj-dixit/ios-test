import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setInstituteCode, setLoginData, setSessions} from './actions';
import axios from 'axios';
import {globalConstants} from '../../constants';

const noop = () => {};

const studentLogin =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    //  do something here
    showLoader();
    API.post(
      `StudentPortalLogin?username=${data.username}&password=${data.password}`,
      data,

      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(res => {
        if (res?.data?.status !== 'Fail' && res.data.data) {
          const rawUser = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
          const normalizedUser = {
            ...rawUser,
            StudentId: rawUser?.StudentId || rawUser?.Studentid || rawUser?.StudentID,
            InstituteID: rawUser?.InstituteID || rawUser?.Instituteid || rawUser?.InstID,
            StudentName: rawUser?.StudentName || rawUser?.studentname || rawUser?.Studentname,
          };

          // New: Check Fee Setup before finalizing login
          API.get(`CheckFeeSetup?StudentID=${normalizedUser.StudentId}`)
            .then(feeRes => {
              hideLoader();
              const responseData = typeof feeRes.data === 'string' ? feeRes.data : (feeRes.data?.Data || feeRes.data?.message || '');

              // Check if fee setup is already done
              if (responseData && responseData.includes('Found') && !responseData.includes('Not Found')) {
                // Scenario: Record Found - Normal Login
                successCallback({ ...res.data, data: normalizedUser });
                dispatch(setLoginData(normalizedUser));
              } else {
                // Scenario: Record Not Found or other response - Redirect to Setup
                successCallback({
                  ...res.data,
                  data: normalizedUser,
                  setupRequired: true
                });
              }
            })
            .catch(() => {
              // Fallback to normal login if check fails to prevent blocking user
              hideLoader();
              successCallback({ ...res.data, data: normalizedUser });
              dispatch(setLoginData(normalizedUser));
            });
        } else {
          hideLoader();
          failureCallback(res.data);
        }
      })
      .catch(() => {
        hideLoader();
        failureCallback();
      });
  };

const facultyLogin =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.post('FacultyPortalLogin', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(res => {
        hideLoader();
        console.log("Faculty Login API Response:", JSON.stringify(res.data, null, 2));

        if (res?.data?.status !== 'Fail' && res.data.data) {
          successCallback(res.data);
          dispatch(setLoginData({...res.data.data[0], session: data.Session}));
        } else {
          failureCallback(res.data);
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback();
      });
  };

const getSessions =
  (id, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    dispatch(setSessions([]));
    API.get(`GetSession?instID=${id}`)
      .then(res => {
        hideLoader();
        if (res?.data?.status !== 'Fail' && res.data.data) {
          successCallback(res.data);
          dispatch(setSessions(res.data.data));
        } else {
          failureCallback(res.data);
        }
      })
      .catch(err => {
        failureCallback();
      });
  };

const getInstituteResponse =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    axios
      .get(
        `${globalConstants.default.INSTITUTE_BASE_URL}GetClientName?OrgCode=${data.OrgCode}`,
      )
      .then(res => {
        hideLoader();

        if (res?.data?.status !== 'Fail' && res.data.data) {
          successCallback(res.data);
          dispatch(setInstituteCode(res.data.data));
        } else {
          failureCallback(res.data);
        }
      })
      .catch(() => {
        hideLoader();
        failureCallback();
      });
  };

export default {
  studentLogin,
  getInstituteResponse,
  getSessions,
  facultyLogin,
};
