import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {feeDetailOperations} from '../../reduxOperations/feedetail';
import {admitCardOperations} from '../../reduxOperations/admincard';
import FeeDetailView from './FeedetailView';
import {
  printDataForBase64,
  showErrorMessage,
} from '../../utils/commonFunctions';
import RNFetchBlob from 'react-native-blob-util';
import {Platform} from 'react-native';
import {hideLoader} from '../../components/appLoader';

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

  const handlePrint = () => {
    if (props.userDetails) {
      const payload = `Studentid=${props.userDetails.StudentId}&InstituteID=${props.userDetails.InstituteID}&ReceiptNo=${selectedReceipts}`;

      let fileName =
        'Fee Receipt - ' +
        props.userDetails.studentname +
        '-' +
        props.profileData.FatherName;

      const successCallback = res => {
        if (res) {
          printDataForBase64(res, fileName);
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

      const successCallback = res => {
        if (res) {
          printDataForBase64(
            res,
            'StudentLedgerSummary - ' +
              props.userDetails.studentname +
              '-' +
              props.profileData.FatherName,
          );
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
      selectedReceipts={selectedReceipts}
      handleCheckBox={handleCheckBox}
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
