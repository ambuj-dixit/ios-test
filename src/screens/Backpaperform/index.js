import React, {useEffect, useState} from 'react';
import Backpaperformview from './Backpaperformview';
import {connect, useDispatch} from 'react-redux';
import {backpaperFormOperations} from '../../reduxOperations/backpaperForm';
import {
  setBackPaperSemesters,
  setBackPaperSubjects,
} from '../../reduxOperations/backpaperForm/actions';
import {
  printDataForBase64,
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/commonFunctions';
import {Alert} from 'react-native';
import {globalConstants} from '../../constants';
import RazorpayCheckout from 'react-native-razorpay';

import {colors} from '../../styles';
import axios from 'axios';
import _ from 'lodash';
import {hideLoader, showLoader} from '../../components/appLoader';

const BackpaperformContainer = props => {
  const dispatch = useDispatch();
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [paidSubjects, setPaidSubjects] = useState([]);
  const [unpaidSubjects, setunPaidSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [showSubject, setShowSubjects] = useState(true);
  const [showPaidSubjects, setshowPaidSubjects] = useState(true);

  const paidSubjectsFields = [
    {name: 'YearSem', label: 'Year/Semester'},
    {name: 'SubjectName', label: 'Course Name(Code)'},
    {name: 'LastGrade', label: 'Grade Obtained in Last Examination'},
    {name: 'TranId', label: 'Transaction ID'},
    {name: 'TranDate', label: 'Transaction Date'},
    {name: 'Amount', label: 'Fee'},
    {name: 'Receipt_No', label: 'Receipt No'},
  ];

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderId) {},
      onError(error, orderId) {
        console.log('error', error);
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  });

  const handleSubmit = async () => {
    try {
      const session = new CFSession(
        'order_token',
        'order_101024392oVzaS8TCkH8psaTazGGKXFs3tL',
        CFEnvironment.SANDBOX,
      );
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.PAYPAL)
        .add(CFPaymentModes.UPI)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#E64A19')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
    return;
  };

  const getBackFormData = () => {
    const scb = () => {};
    const ecb = () => {};

    dispatch(
      backpaperFormOperations.getBackPaperFormExamStatus(
        props.userDetails.StudentId,
        scb,
        ecb,
      ),
    );
    dispatch(backpaperFormOperations.getBackPaperexamName(props.userDetails));
    dispatch(backpaperFormOperations.getBackPaperGrade(props.userDetails));
    dispatch(setBackPaperSemesters([]));
    dispatch(setBackPaperSubjects([]));
    dispatch(backpaperFormOperations.getBackFormAmount(props.userDetails));
  };

  useEffect(() => {
    getBackFormData();
  }, []);

  const getPaidUnpaidSubjects = parameter => {
    const paidSuccessCB = res => {
      if (res.data) {
        setPaidSubjects(res.data);
      } else {
        setPaidSubjects([]);
      }
    };

    dispatch(
      backpaperFormOperations.getBackPaperPaidSubjects(
        {
          ...props.userDetails,
          ExamName: parameter,
        },
        paidSuccessCB,
      ),
    );

    const unPaidSuccessCB = res => {
      if (res?.data) {
        setunPaidSubjects(res.data);
      } else {
        setunPaidSubjects([]);
      }
    };

    dispatch(
      backpaperFormOperations.getBackPaperUnPaidSubjects(
        {
          ...props.userDetails,
          ExamName: parameter,
        },
        unPaidSuccessCB,
      ),
    );
  };

  const handleBackPaperExamChange = event => {
    if (event?.Title_Name) {
      setSelectedExam(event?.Title_Name);
      setSelectedYear('');
      dispatch(
        backpaperFormOperations.getSemesters({
          ...props.userDetails,
          ExamName: event.Title_Name,
        }),
      );

      getPaidUnpaidSubjects(event.Title_Name);
    }
  };

  const handleSemesterChange = event => {
    if (event?.SID) {
      setSelectedYear(event.SID);
      const ecb = () => {
        Alert.alert(
          globalConstants.default.appName,
          'Subject not found for the selected semester/year Please contact your institute.',
        );
      };
      dispatch(
        backpaperFormOperations.getBackPaperSubjects(
          {
            ...props.userDetails,
            ddlSemesterYear: event.SID,
          },
          () => {},
          ecb,
        ),
      );
      setSelectedGrade('');
      setSelectedCourse('');
    }
  };

  const handleCourseChange = e => {
    let allSubjects = _.union(paidSubjects, unpaidSubjects);
    allSubjects = allSubjects.filter(it => it.SubjectId === e?.SUbjectID);
    let subjectExists = allSubjects.length > 0;
    if (subjectExists) {
      Alert.alert(
        globalConstants.default.appName,
        'Selected subject already exists...',
      );
      setSelectedCourse(undefined);
      setSelectedGrade(undefined);
    } else {
      setSelectedCourse(e?.SUbjectID);
      setSelectedGrade('');
    }
  };

  const handleAddSubject = () => {
    if (!selectedExam) {
      showErrorMessage('Please select exam name');
    } else if (!selectedCourse) {
      showErrorMessage('Please select course');
    } else if (!selectedGrade) {
      showErrorMessage('Please select grade');
    } else {
      let allSubjects = _.union(paidSubjects, unpaidSubjects);
      allSubjects = allSubjects.filter(it => it.SubjectId === selectedCourse);
      let subjectExists = allSubjects.length > 0;
      if (subjectExists) {
        Alert.alert(
          globalConstants.default.appName,
          'Selected subject already exists...',
        );
      } else {
        const scb = () => {
          showSuccessMessage('Record Saved');
          getPaidUnpaidSubjects(selectedExam);
        };
        const ecb = () => {};
        dispatch(
          backpaperFormOperations.insertUpdate(
            {
              Studentid: props.userDetails.StudentId,
              instID: props.userDetails.InstituteID,
              Action: 'True',
              SubjectId: selectedCourse,
              courseid: props.userDetails.CourseID,
              ddlSemesterYear: selectedYear,
              grade: selectedGrade,
              ExamName: selectedExam,
            },
            scb,
            ecb,
          ),
        );
      }
    }
  };

  const handleGradeChange = e => {
    setSelectedGrade(e.Grade);
  };

  const deleteSubject = e => {
    if (!selectedYear) {
      Alert.alert(
        globalConstants.default.appName,
        'Please select year/semeseter',
      );
    } else {
      const scb = () => {
        showSuccessMessage('Record deleted');
        // getBackFormData();
        getPaidUnpaidSubjects(selectedExam);
      };
      const ecb = () => {
        showErrorMessage('Error while removing subject');
      };
      dispatch(
        backpaperFormOperations.insertUpdate(
          {
            Studentid: props.userDetails.StudentId,
            instID: props.userDetails.InstituteID,
            Action: 'False',
            SubjectId: e.SubjectId,
            courseid: props.userDetails.CourseID,
            ddlSemesterYear: selectedYear,
            grade: e.LastGrade,
            ExamName: selectedExam,
          },
          scb,
          ecb,
        ),
      );
    }
  };

  const handlePayment = () => {
    if (unpaidSubjects?.length < 1) {
      showErrorMessage('Please add subjects before continuing');
    } else if (!props.eachSubjectAmount) {
      showErrorMessage(
        'Subject amount does not exists for each subject. Please contact your institute',
      );
    } else {
      let options = {
        description: 'CONDENSED FORM FEES',
        currency: 'INR',
        key: 'rzp_live_CORoIz9wJo1pH7',
        amount: unpaidSubjects?.length * props.eachSubjectAmount * 100,
        name: globalConstants.default.appName,
        prefill: {
          email: props.profileData?.Email ?? '',
          contact: props.profileData?.ContactNo ?? '',
          name: props.profileData?.StudentName ?? '',
        },
        theme: {color: colors.blue},
      };
      //  TODO: can we make this working also for test?s
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
              console.log('Res', res.data);
              // check if payment is captured by razorpay
              if (res.data.status === 'captured') {
                const scb = () => {
                  Alert.alert(
                    globalConstants.default.appName,
                    'Payment successful',
                  );

                  getPaidUnpaidSubjects(selectedExam);
                };
                const ecb = () => {
                  Alert.alert(
                    globalConstants.default.appName,
                    'Error while making payment',
                  );
                };
                dispatch(
                  backpaperFormOperations.savePaymentData(
                    {
                      instId: props.userDetails.InstituteID,
                      ReceiptAmount:
                        unpaidSubjects?.length * props.eachSubjectAmount,
                      tranid: data.razorpay_payment_id,
                      Studentid: props.userDetails.StudentId,
                      ExamName: selectedExam,
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
            })
            .catch(() => {
              Alert.alert(globalConstants.default.appName, 'Payment failed!!');
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  /**
   * Call this function to download any file for a base64 data
   * @param {*} fileData
   * @param {*} fileName
   * @returns
   */
  const downlooadFileForBase64 = (fileData, fileName) => {
    if (!fileData) {
      return showErrorMessage('Error downloading report');
    }
    showLoader();
    printDataForBase64(fileData, fileName);
    hideLoader();
  };

  const handleDownloadReceipt = e => {
    const scb = res => {
      downlooadFileForBase64(res, e.Receipt_No);
    };
    const ecb = () => {
      showErrorMessage('Error downloading receipt');
    };
    dispatch(
      backpaperFormOperations.getSubjectReceipt(
        {...props.userDetails, ReceiptNo: e.Receipt_No},
        scb,
        ecb,
      ),
    );
  };

  const handleDownloadReport = e => {
    const scb = res => {
      downlooadFileForBase64(res, selectedExam);
    };
    const ecb = () => {
      showErrorMessage('Error downloading report');
    };
    dispatch(
      backpaperFormOperations.getReportData(
        {...props.userDetails, ExamName: selectedExam},
        scb,
        ecb,
      ),
    );
  };

  return (
    <Backpaperformview
      academicDetails={props?.academicDetails}
      handleAddSubject={handleAddSubject}
      deleteSubject={deleteSubject}
      navigation={props.navigation}
      handleDownloadReport={handleDownloadReport}
      selectedExam={selectedExam}
      unpaidSubjects={unpaidSubjects}
      selectedGrade={selectedGrade}
      handleDownloadReceipt={handleDownloadReceipt}
      selectedYear={selectedYear}
      handleBackPaperExamChange={handleBackPaperExamChange}
      backpaperExamName={props.backpaperExamName}
      backPaperSemesters={props.backPaperSemesters}
      grades={props.grades}
      showSubject={showSubject}
      paidSubjectsFields={paidSubjectsFields}
      paidSubjects={paidSubjects}
      setShowSubjects={setShowSubjects}
      handleSemesterChange={handleSemesterChange}
      backpaperSubjects={props.backpaperSubjects}
      handleCourseChange={handleCourseChange}
      selectedCourse={selectedCourse}
      handleGradeChange={handleGradeChange}
      handlePayment={handlePayment}
      showPaidSubjects={showPaidSubjects}
      eachSubjectAmount={props.eachSubjectAmount}
      setshowPaidSubjects={setshowPaidSubjects}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  profileData: state.profile.profileData,
  dashboardDetails: state.dashboard.dashboardData,
  academicDetails: state.dashboard.academicDetails,
  backpaperExamName: state.backpaperForm.backpaperExamName,
  backPaperSemesters: state.backpaperForm.backPaperSemesters,
  grades: state.backpaperForm.grades,
  backpaperSubjects: state.backpaperForm.backpaperSubjects,
  eachSubjectAmount: state.backpaperForm.eachSubjectAmount,
});

export default connect(mapStateToProps)(BackpaperformContainer);
