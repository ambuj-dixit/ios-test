import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {feeDetailOperations} from '../../../reduxOperations/feedetail';
import {admitCardOperations} from '../../../reduxOperations/admincard';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import FeeDetailView from './FeeView';
import {
  printDataForBase64,
  showErrorMessage,
  showSuccessMessage,
} from '../../../utils/commonFunctions';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import {hideLoader, showLoader} from '../../../components/appLoader';

function FeeDetailContainer(props) {
  const dispatch = useDispatch();

  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    }
  }, []);

  const onRefresh = () => {
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
    }
  };

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
          let fileName =
            'StudentLedgerSummary - ' +
            props.userDetails.studentname +
            '-' +
            props.profileData.FatherName;

          printDataForBase64(res, fileName);
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

  const handleVoucherView = event => {
    const payload = {
      StudentId: props.userDetails.StudentId,
      voucherNo: event?.VoucherNo,
    };
    console.log('payload',payload);

    const scb = res => {
      if (res?.data) {
        setModalVisible(true);
      }
    };
    const ecb = err => {
      if (err?.message) {
        showErrorMessage(err.message);
      } else {
        showErrorMessage('Error while getting voucher detail');
      }
    };

    dispatch(
      feeDetailOperations.getStudentFeeHeadVoucharDetail(payload, scb, ecb),
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <FeeDetailView
      feeDetail={props.feeDetail}
      studentFeeHeadVoucharDetail={props.studentFeeHeadVoucharDetail}
      setSelectedVouche={setSelectedVoucher}
      handlePress={handlePrint}
      closeModal={closeModal}
      setSelectedReceipts={setSelectedReceipts}
      selectedVoucher={selectedVoucher}
      handleVoucherView={handleVoucherView}
      navigation={props.navigation}
      modalVisible={modalVisible}
      selectedReceipts={selectedReceipts}
      handleCheckBox={handleCheckBox}
      onRefresh={onRefresh}
      handleSummaryPrint={handleSummaryPrint}
    />
  );
}

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  feeDetail: state.feeDetail,
  profileData: state.profile.profileData,
  studentFeeHeadVoucharDetail: state.feeDetail.studentFeeHeadVoucharDetail,
});

export default connect(mapStateToProps)(FeeDetailContainer);
