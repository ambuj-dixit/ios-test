import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {feeDetailOperations} from '../../../reduxOperations/feedetail';
import {admitCardOperations} from '../../../reduxOperations/admincard';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import FeeDetailView from './ReceiptView';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../utils/commonFunctions';
import RNFetchBlob from 'react-native-blob-util';
import {Platform} from 'react-native';
import {hideLoader, showLoader} from '../../../components/appLoader';
import commonFunctions from '../../../utils';

function FeeDetailContainer(props) {
  const dispatch = useDispatch();

  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [feeReceiptValue, setfeeReceiptValue] = useState(null);

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        StudentId: props.userDetails.StudentId,
      };
      const successCallback = () => {};
      const failureCallback = () => {};
      dispatch(
        feeDetailOperations.getFeeDueDetail(
          payload,
          successCallback,
          failureCallback,
        ),
      );
      dispatch(
        feeDetailOperations.getVoucherDetail(
          payload,
          successCallback,
          failureCallback,
        ),
      );
      dispatch(
        feeDetailOperations.getReceiptDetail(
          payload,
          successCallback,
          failureCallback,
        ),
      );
      dispatch(
        feeDetailOperations.getPrevTransactionDetail(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  const handlePrint = event => {
    if (props.userDetails) {
      const payload = `Studentid=${props.userDetails.StudentId}&InstituteID=${props.userDetails.InstituteID}&ReceiptNo=${event}`;

      let fileName =
        'Fee Receipt - ' +
        props.userDetails.studentname +
        '-' +
        props.profileData.FatherName;

      const successCallback = res => {
        if (res) {
          let path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}.pdf`;
          path = path?.replace(/\s/g, '');
          RNFetchBlob.fs
            .writeFile(path, res, 'base64')
            .then(() => {
              hideLoader();
              if (Platform.OS === 'ios') {
                RNFetchBlob.ios.previewDocument(path);
              } else {
                RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
              }
            })
            .catch(err => {});
        }
      };
      const failureCallback = () => {
        showErrorMessage('Error downloading fee receipt');
      };
      dispatch(
        admitCardOperations.downloadFeeReceipt(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  };

  const handleSummaryPrint = type => {
    if (props?.userDetails) {
      const payload = `studentId=${props.userDetails.StudentId}&instId=${props.userDetails.InstituteID}`;

      const successCallback = res => {
        if (res) {
          let fileName =
            'StudentLedgerSummary - ' +
            props.userDetails.studentname +
            '-' +
            props.profileData.FatherName;

          let path;
          if (Platform.OS === 'android') {
            path = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.pdf`;
          } else {
            path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}.pdf`;
          }

          RNFetchBlob.fs
            .writeFile(path, res, 'base64')
            .then(() => {
              if (Platform.OS === 'ios') {
                RNFetchBlob.ios.previewDocument(path);
              } else {
                RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
              }
            })
            .catch(err => {});
        }
      };
      const failureCallback = () => {
        showErrorMessage('Error downloading fee receipt');
      };
      if (type === 'students') {
        dispatch(
          admitCardOperations.downloadFeeSumaryForStudents(
            payload,
            successCallback,
            failureCallback,
          ),
        );
      } else {
        dispatch(
          admitCardOperations.downloadFeeSumary(
            payload,
            successCallback,
            failureCallback,
          ),
        );
      }
    }
  };

  return (
    <FeeDetailView
      feeDetail={props.feeDetail}
      setSelectedVouche={setSelectedVoucher}
      handlePress={handlePrint}
      setSelectedReceipts={setSelectedReceipts}
      selectedVoucher={selectedVoucher}
      navigation={props.navigation}
      handlePrint={handlePrint}
      selectedReceipts={selectedReceipts}
      handleSummaryPrint={handleSummaryPrint}
      feeReceiptValue={feeReceiptValue}
      setfeeReceiptValue={setfeeReceiptValue}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(FeeDetailContainer);
