import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {feeDetailOperations} from '../../../reduxOperations/feedetail';
import {admitCardOperations} from '../../../reduxOperations/admincard';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import FeeDetailView from './TransactionsView';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../utils/commonFunctions';
import RNFetchBlob from 'react-native-blob-util';
import {Alert, Platform} from 'react-native';

function FeeDetailContainer(props) {
  const dispatch = useDispatch();

  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
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

  const handleCheckBox = (val, type) => {
    if (type === 'voucher') {
      setSelectedVoucher(val);
    } else {
      setSelectedReceipts(val);
    }
  };

  const handleSummaryPrint = type => {
    if (props?.userDetails) {
      const payload = `studentId=${props.userDetails.StudentId}&instId=${props.userDetails.InstituteID}`;

      try {
        const successCallback = res => {
          if (res) {
            let fileName =
              'StudentLedgerSummary - ' +
              props.userDetails.studentname +
              '-' +
              props.profileData.FatherName;

            let path = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}.pdf`;
            path = path?.replace(/\s/g, '');

            RNFetchBlob.fs
              .writeFile(path, res, 'base64')
              .then(() => {
                if (Platform.OS === 'ios') {
                  RNFetchBlob.ios.previewDocument(path);
                } else {
                  RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
                }
                // showSuccessMessage('File downloaded to download');
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
      } catch (error) {
        Alert.alert(JSON.stringify(error));
      }
    }
  };

  const onRefresh = () => {
    setrefreshing(true);
    const successCallback = () => {
      setrefreshing(false);
    };
    const failureCallback = () => {
      setrefreshing(false);
    };

    const payload = {
      StudentId: props?.userDetails?.StudentId,
    };

    dispatch(
      feeDetailOperations.getPrevTransactionDetail(
        payload,
        successCallback,
        failureCallback,
      ),
    );
  };

  return (
    <FeeDetailView
      feeDetail={props.feeDetail}
      setSelectedVouche={setSelectedVoucher}
      setSelectedReceipts={setSelectedReceipts}
      selectedVoucher={selectedVoucher}
      navigation={props.navigation}
      selectedReceipts={selectedReceipts}
      handleCheckBox={handleCheckBox}
      handleSummaryPrint={handleSummaryPrint}
      feeReceiptValue={feeReceiptValue}
      setfeeReceiptValue={setfeeReceiptValue}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(FeeDetailContainer);
