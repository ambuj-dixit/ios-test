import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {marksheetOperations} from '../../reduxOperations/marksheet';

import Marksheetview from './Marksheetview';
import RNFetchBlob from 'rn-fetch-blob';
import {showErrorMessage} from '../../utils/commonFunctions';
import {Alert, Platform} from 'react-native';
import {globalConstants} from '../../constants';

function MarksheetContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
      };
      const successCallback = () => {};
      const failureCallback = err => {
        if (err?.message) {
          showErrorMessage(err.message);
        }
      };
      dispatch(
        marksheetOperations.getStudentMarksheet(
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
        StudentReg: props?.marksheetDetail?.student_detail?.EnrollmentNo,
      };

      const successCallback = res => {
        if (res) {
          const path = `${RNFetchBlob.fs.dirs.DocumentDir}/StudentMarksheet.pdf`;
          RNFetchBlob.fs
            .writeFile(path, res, 'base64')
            .then(() => {
              if (Platform.OS === 'android') {
                RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
              } else {
                RNFetchBlob.ios.previewDocument(path);
              }
            })
            .catch(err => {});
        }
      };
      const failureCallback = () => {
        Alert.alert(globalConstants.default.appName, 'No data to print');
      };
      dispatch(
        marksheetOperations.downloadStudentMarksheet(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  };

  return (
    <Marksheetview
      marksheetData={props.marksheetDetail}
      handlePress={handlePrint}
      navigation={props.navigation}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  marksheetDetail: state.marksheet.marksheetData,
});

export default connect(mapStateToProps)(MarksheetContainer);
