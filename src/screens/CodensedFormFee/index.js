import React, {useEffect, useState} from 'react';
import CodensedFormFeeView from './CodensedFormFeeView';
import {connect, useDispatch} from 'react-redux';
import {condensedFormOperations} from '../../reduxOperations/condensedForm';
import {Alert, Platform, Pressable} from 'react-native';
import CheckBox from 'react-native-check-box';
import {colors} from '../../styles';
import {View, Text} from 'react-native';
import styles from './styles';
import {globalConstants} from '../../constants';
import RazorpayCheckout from 'react-native-razorpay';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {printDataForBase64} from '../../utils/commonFunctions';

const SubjectCard = ({item, showCheckbox, onCheckBoxChange}) => {
  // in selected subject list do not show subject that are not filled
  if (!showCheckbox && item?.FilledStatus !== 'True') {
    return null;
  }
  return (
    <Pressable
      style={styles.card}
      disabled={!showCheckbox}
      onPress={() => onCheckBoxChange(item)}>
      <View style={styles.cardHeader}>
        <Text
          style={
            styles.subjectCode
          }>{`${item.SubjectName} (${item.SubjectCode})`}</Text>
        {showCheckbox && (
          <CheckBox
            isChecked={item?.FilledStatus === 'True'}
            onClick={() => {
              onCheckBoxChange(item);
            }}
            checkBoxColor={colors.blue}
          />
        )}
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Subject Type</Text>
        <Text style={styles.cardValue}>{item.SubjectCatType}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Credits</Text>
        <Text style={styles.cardValue}>{item.Credit}</Text>
      </View>
    </Pressable>
  );
};

const CondensedFormContainer = props => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [receiptNo, setReceiptNo] = useState();
  const dispatch = useDispatch();
  const getFormData = () => {
    const scb = res => {
      console.log(res);
      if (res?.message) {
        setPaymentStatus(res);
        if (res.message !== 'Not Paid Yet') {
          Alert.alert('ESIM Campus Solution', res.message);
        }
      }
      if (res?.data?.Receipt_No) {
        setReceiptNo(res.data.Receipt_No);
      }
    };

    const ecb = err => {
      if (err?.message) {
        Alert.alert(globalConstants.default.appName, err.message);
      }
    };
    dispatch(
      condensedFormOperations.getAmountPayStatus(
        props.userDetails.StudentId,
        scb,
        ecb,
      ),
    );

    dispatch(condensedFormOperations.getAmountPay(props.userDetails));
    dispatch(
      condensedFormOperations.getCondensedSubjectDetail({
        ...props.userDetails,
        SessionID: props.academicDetails.Batch,
      }),
    );
  };

  const inputFields = [
    {label: 'Admission No./Enrollment No.', key: 'RegNo'},
    {label: 'Student Name', key: 'StudentName'},
    {label: 'School', key: 'SchoolName'},
    {label: 'Course Name', key: 'CourseName'},
    {label: 'Semester', key: 'CourseYear'},
    {label: 'Specialisation', key: 'SpecilisationName'},
  ];

  useEffect(() => {
    getFormData();
  }, []);

  const handlereceiptPrint = () => {
    const scb = res => {
      if (res?.file) {
        printDataForBase64(res.file, 'ReceiptStudentBackExam');
      }
    };
    const ecb = () => {};

    dispatch(
      condensedFormOperations.getCondensedReceiptData(
        {studentid: props.userDetails.StudentId, receiptNo},
        scb,
        ecb,
      ),
    );
  };

  const payCondensedFees = () => {
    if (props.condensedForm.amountPay?.Amount) {
      let options = {
        description: 'CONDENSED FORM FEES',
        currency: 'INR',
        key: 'rzp_live_CORoIz9wJo1pH7',
        amount: props.condensedForm.amountPay?.Amount * 100,
        name: globalConstants.default.appName,
        prefill: {
          email: props.profileData?.Email ?? '',
          contact: props.profileData?.ContactNo ?? '',
          name: props.profileData?.StudentName ?? '',
        },
        theme: {color: colors.blue},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          axios
            .get(
              `https://api.razorpay.com/v1/payments/${data.razorpay_payment_id}`,
              {
                auth: {
                  username: 'rzp_live_CORoIz9wJo1pH7',
                  password: 's1smgYd5BEMVwkRc9mNMnvhw',
                },
              },
            )
            .then(res => {
              // check if payment is captured by razorpay
              if (res.data.status === 'captured') {
                const scb = () => {
                  Alert.alert(
                    globalConstants.default.appName,
                    'Payment successful',
                  );
                  setTimeout(() => {
                    getFormData();
                  }, 1000);
                };
                const ecb = () => {
                  Alert.alert(
                    globalConstants.default.appName,
                    'Error while making payment',
                  );
                };
                dispatch(
                  condensedFormOperations.getSavedPaymentData(
                    {
                      instId: props.userDetails.InstituteID,
                      Amount: props.condensedForm.amountPay?.Amount,
                      tranid: data.razorpay_payment_id,
                      Studentid: props.userDetails.StudentId,
                    },
                    scb,
                    ecb,
                  ),
                );
              } else {
                Alert.alert(
                  globalConstants.default.appName,
                  'Payment failed!!',
                );
              }
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert(globalConstants.default.appName, 'Please try again');
    }
  };

  const handlePrint = () => {
    const scb = res => {
      if (res?.file) {
        printDataForBase64(res.file, 'CondensedForm');
      }
    };
    const ecb = () => {};

    dispatch(
      condensedFormOperations.getFormDetailPrint(
        props.userDetails.StudentId,
        scb,
        ecb,
      ),
    );
  };

  const onCheckBoxChange = event => {
    const scb = () => {
      dispatch(
        condensedFormOperations.getCondensedSubjectDetail({
          ...props.userDetails,
          SessionID: props.academicDetails.Batch,
        }),
      );
    };
    const ecb = () => {};
    dispatch(
      condensedFormOperations.updateSubjectStatus(
        {
          Studentid: props.userDetails.StudentId,
          Action: event.FilledStatus === 'True' ? 'False' : 'True',
          SubjectId: event?.SubjectID,
        },
        scb,
        ecb,
      ),
    );
  };

  return (
    <CodensedFormFeeView
      handlePrint={handlePrint}
      payCondensedFees={payCondensedFees}
      navigation={props.navigation}
      inputFields={inputFields}
      SubjectCard={SubjectCard}
      academicDetails={props.academicDetails}
      subjectDetail={props.condensedForm.subjectDetail}
      paymentStatus={paymentStatus}
      onCheckBoxChange={onCheckBoxChange}
      receiptNo={receiptNo}
      handlereceiptPrint={handlereceiptPrint}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  condensedForm: state.condensedForm,
  academicDetails: state.dashboard.academicDetails,
  profileData: state.profile.profileData,
});

export default connect(mapStateToProps)(CondensedFormContainer);
