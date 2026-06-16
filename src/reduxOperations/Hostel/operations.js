import {showLoader, hideLoader} from '../../components/appLoader';
import {API} from '../../services';

const getHostelDetails = (data, successCallback = () => {}, failureCallback = () => {}) => dispatch => {
  const StudentId = data?.Studentid; 
  const InstituteID = data?.InstituteID; 
  if (!StudentId) {
    console.error('Missing required parameter: StudentId');
    failureCallback('Missing StudentId');
    return;
  }
  showLoader();
  API.get(`StudentHostelDetails?Studentid=${StudentId}&InstituteId=${InstituteID}`)
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

export default {
  getHostelDetails,
};
