import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {profileOperations} from '../../reduxOperations/profile';

import CourceregistrationView from './CourceregistrationView';
import {Alert} from 'react-native';
import {showErrorMessage} from '../../utils/commonFunctions';

const CourseRegistratioContainer = props => {
  const dispatch = useDispatch();
  const [checkbox1, setCheckbox1] = useState([]);

  const [registrationDetails, setregistrationDetails] = useState({
    Studentid: '',
    RegNo: '',
    StudentName: '',
    AadharNo: '',
    StudentName_IN_Hindi: '',
    FatherName: '',
    FatherContactNo: '',
    MotherName: '',
    MotherContactNo: '',
    ParentEmailID: '',
  });

  const inputLabels = [
    {elementName: 'RegNo'},
    {elementName: 'AadharNo'},
    {elementName: 'StudentName'},
    {elementName: 'StudentName_IN_Hindi', isEditable: true},
    {elementName: 'FatherName', isEditable: true},
    {elementName: 'FatherContactNo', isEditable: true},
    {elementName: 'MotherName', isEditable: true},
    {elementName: 'MotherContactNo', isEditable: true},
    {elementName: 'ParentEmailID', isEditable: true},
    {elementName: 'ParentContactNo', isEditable: true},
    {elementName: 'Religion', isEditable: true},
    {elementName: 'Caste', isEditable: true},
    {elementName: 'Category', isEditable: true},
    {elementName: 'Gender', isEditable: true},
    {elementName: 'Nationality', isEditable: true},
    {elementName: 'Country', isEditable: true},
    {elementName: 'MobileNo', isEditable: true},
    {elementName: 'WhatsappNo', isEditable: true},
    {elementName: 'EmailID', isEditable: true},
    {elementName: 'FacebookID', isEditable: true},
    {elementName: 'Semester'},
    {elementName: 'Session'},
    {elementName: 'SchoolName'},
    {elementName: 'CourseName'},
    {elementName: 'Specilisation'},
    {elementName: 'CurrentAddress', isEditable: true},
    {elementName: 'CurrentDistrict', isEditable: true},
  ];

  useEffect(() => {
    if (props.userDetails) {
      const payload = {
        Studentid: props.userDetails.StudentId,
      };
      const successCallback = () => {};
      const failureCallback = () => {
        Alert.alert(
          'ESIM',
          'Subject not mapped yet please contact to academic cell...',
        );
      };
      dispatch(
        profileOperations.getCourseRegistrationDetails(
          payload,
          successCallback,
          failureCallback,
        ),
      );
    }
  }, []);

  useEffect(() => {
    if (props?.courseRegistrationData?.registration_detail) {
      const detail = props?.courseRegistrationData?.registration_detail;

      setregistrationDetails({
        ...detail,
        Session: detail.SessionYear,
        Semester: detail.SemesterID,
        Specilisation: detail.SpecilisationName,
      });
    }
  }, [props.courseRegistrationData]);

  const onSave = () => {
    let error = '';
    if (!registrationDetails.AadharNo) {
      error = 'Please enter Aadhar card number';
    } else if (!registrationDetails.StudentName_IN_Hindi) {
      error = 'Please enter student name in Hindi';
    } else if (!registrationDetails.FatherName) {
      error = "Please enter father's name";
    } else if (!registrationDetails.FatherContactNo) {
      error = "Please enter father's contact number";
    } else if (!registrationDetails.MotherName) {
      error = "Please enter mother's name";
    } else if (!registrationDetails.MotherContactNo) {
      error = "Please enter mother's contact number";
    }

    if (error) {
      showErrorMessage(error);
    } else {
    }
  };

  const setDataForInput = (text, elementName) => {
    setregistrationDetails({
      ...registrationDetails,
      [elementName]: text,
    });
  };

  const handleToggle = id => {
    let temp = [...checkbox1];

    if (checkbox1.includes(id)) {
      temp = checkbox1.filter(item => item !== id);
    } else {
      temp.push(id);
    }

    setCheckbox1(temp);
  };

  return (
    <CourceregistrationView
      registrationDetails={registrationDetails}
      navigation={props.navigation}
      setCheckbox1={setCheckbox1}
      checkbox1={checkbox1}
      onSave={onSave}
      setDataForInput={setDataForInput}
      inputLabels={inputLabels}
      handleToggle={handleToggle}
      courseRegistrationData={props.courseRegistrationData}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  profileData: state.profile.profileData,
  academicDetails: state.dashboard.academicDetails,
  courseRegistrationData: state.profile.courseRegistrationData,
});

export default connect(mapStateToProps)(CourseRegistratioContainer);
