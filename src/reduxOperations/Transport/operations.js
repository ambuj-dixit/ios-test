
import {showLoader, hideLoader} from '../../components/appLoader';
import {API} from '../../services';

const getTransportDetails = (data, successCallback = () => {}, failureCallback = () => {}) => dispatch => {

  const StudentId = data?.Studentid;
  const InstituteID = data?.InstituteID; 

  if (!StudentId) {
    console.error('Missing required parameter: StudentId');
    failureCallback('Missing StudentId');
    return;
  }

  showLoader();

  API.get(`StudentTransportDetails?Studentid=${StudentId}&InstituteId=${InstituteID}`)
    .then(res => {
      if (res?.data?.status === 'Success') {
        successCallback(res?.data?.data);
      } else {
        failureCallback(res?.data?.message || 'Failed to fetch transport details');
      }
    })
    .catch(err => {
      failureCallback(err);
    })
    .finally(() => {
      hideLoader();
    });
};

const downloadBUSPass =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    API.get(`Student_BusPass?Studentid=${data?.Studentid}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          successCallback(res?.data?.data.file);
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
  getTransportDetails,
  downloadBUSPass,
};
