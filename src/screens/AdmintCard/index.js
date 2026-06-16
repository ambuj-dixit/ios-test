import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {admitCardOperations} from '../../reduxOperations/admincard';
import AdminCardView from './AdminCardView';
import {
  printDataForBase64,
  showErrorMessage,
} from '../../utils/commonFunctions';

function AdmintCardContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
      };
      const successCallback = () => {};
      const failureCallback = () => {
        showErrorMessage('No data to show!!');
      };
      dispatch(
        admitCardOperations.getAdmitCard(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  const handlePrint = () => {
    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
      };

      const successCallback = res => {
        if (res) {
          printDataForBase64(res, 'AdmitCard');
        }
      };
      const failureCallback = () => {
        showErrorMessage('Error while downloading file!!');
      };
      dispatch(
        admitCardOperations.downloadAdmitCard(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  };

  return (
    <AdminCardView
      admitCardDetail={props.admitCardDetail}
      handlePress={handlePrint}
      navigation={props.navigation}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  marksheetDetail: state.marksheet.marksheetData,
  admitCardDetail: state.admitCard.admitCardData,
  globalstate: state,
});

export default connect(mapStateToProps)(AdmintCardContainer);
