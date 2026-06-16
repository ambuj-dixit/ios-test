import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';

import {setProfileData, setCourseRegistrationData} from './actions';

const noop = () => {};

const getProfileData =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(
      `Student_Profile?Studentid=${data.StudentId}&Instituteid=${data.InstituteID}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data[0]) {
          dispatch(setProfileData(res.data.data[0]));
          hideLoader();
          console.log("API Response:====", res.data); 
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

const getCourseRegistrationDetails =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setCourseRegistrationData(null));

    API.get(`Course_Registration?Studentid=${data.Studentid}`)
      .then(res => {
        if (res?.data?.status === 'Success' && res?.data?.data) {
          dispatch(setCourseRegistrationData(res.data.data));
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

export default {getProfileData, getCourseRegistrationDetails};
