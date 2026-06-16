import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import AttendanceListView from './AttendanceList';
import {studentAttendanceOperations} from '../../../reduxOperations/facultyStudentAttendance';
import {getUniqueArrayObject,showErrorMessage,}from '../../../utils/commonFunctions';
import commonFunctions from '../../../utils';
import moment from 'moment';
import _ from 'lodash';

  const AttendanceListContainer = props => {
  const dispatch = useDispatch();
  const [filteredStudentList, setStudentsFilteredList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const radioButtons = [
    {
      id: '1',
      label: 'New',
      value: 'new',
    },
    {
      id: '2',
      label: 'Edit/Update',
      value: 'update',
    },
  ];

  const sortButtons = [
    {id: '1', label: 'Name', value: 'Name'},
    {id: '2', label: 'Roll No', value: 'UniversityRollNo'},
  ];

  const [inputText, setInputText] = useState('');

  const periodTypeButtons = [
    {id: '1', label: 'Lecture', value: 1},
    {id: '2', label: 'Practical', value: 2},
  ];

  const classNumberButtons = [
    {id: '1', label: '1st', value: 1},
    {id: '2', label: '2nd', value: 2},
    {id: '3', label: '3rd', value: 3},
    {id: '4', label: '4th', value: 4},
    {id: '5', label: '5th', value: 5},
    {id: '6', label: '6th', value: 6},
    {id: '7', label: '7th', value: 7},
    {id: '8', label: '8th', value: 8},
    {id: '9', label: '9th', value: 9},
    {id: '10', label: '10th', value: 10},
    {id: '11', label: '11th', value: 11},
    {id: '12', label: '12th', value: 12},
  ];

  const [isModalView, setIsModalView] = useState(true);

  const [coursesList, setCoursesList] = useState([]);

  const [selectedId, setSelectedId] = useState('1');
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  useEffect(() => {
    if (inputText) {
      const filtData = studentData.filter(v => {
        // const filtData = props.studentsList.filter(v => {
        if (v?.Name) {
          return v?.Name.toLowerCase().includes(inputText.toLowerCase());
        } else {
          return -1;
        }
      });
      let updatedData = _.sortBy(filtData, sortBy);
      setStudentsFilteredList(updatedData);
    } else {
      sortDataBasedOnFilter();
    }
  }, [inputText]);

  const sortDataBasedOnFilter = () => {
    if (studentData?.length > 0) {
      let updatedData = _.sortBy(studentData, sortBy);

      setStudentsFilteredList(updatedData);
    }
  };

  useEffect(() => {
    sortDataBasedOnFilter();
  }, [sortBy]);

  const [data, setData] = useState({
    type: null,
    course: null,
    semester: null,
    subject: null,
    attendanceDate: new Date(),
    sections: null,
    periodNo: null,
    periodType: null,
  });

  const toggleModal = e => {
    setIsModalView(e);
  };

  useEffect(() => {
    const failureCallback = () => {
      commonFunctions.showErrorMessage('Error while fetching faculty details');
    };

    let payload = {
      EmpId: props.userDetails.Empid,
      // instituteId: props.userDetails.InstituteID,
    };

    dispatch(
      studentAttendanceOperations.getCourses(
        payload,
        () => {},
        failureCallback,
      ),
    );
  }, []);

  // useEffect(() => {
  //   sortDataBasedOnFilter();
  // }, [props.studentsList]);

  useEffect(() => {
    if (data.course) {
      const payload = {
        EmpId: props.userDetails.Empid,
        session: props?.userDetails?.session,
        course: data?.course,
        InstituteId: props?.userDetails?.InstituteID,
      };
      const scb = () => {};
      const ecb = () => {};
      dispatch(studentAttendanceOperations.getSemesters(payload, scb, ecb));

      dispatch(
        studentAttendanceOperations.getSpecializations(payload, scb, ecb),
      );
    }
  }, [data?.course]);

  useEffect(() => {
    if (data.semester) {
      const payload = {
        EmpId: props.userDetails.Empid,
        session: props?.userDetails?.session,
        course: data?.course,
        InstituteId: props?.userDetails?.InstituteID,
        semester: data.semester,
        specialization: props.specializationsList[0].SpecilizationID,
      };
      const scb = () => {};
      const ecb = () => {};

      dispatch(studentAttendanceOperations.getSubjects(payload, scb, ecb));
      dispatch(studentAttendanceOperations.getSections(payload, scb, ecb));
    }
  }, [data?.semester]);

  useEffect(() => {
    const getValue = async () => {
      let list = [...props.courses];

      let filteredList = await getUniqueArrayObject(
        list,
        'CourseName',
        'CourseId',
      );

      setCoursesList(filteredList);
    };
    if (props.courses && props.courses?.length > 0) {
      getValue();
    }
  }, [props.courses]);

  const handleUpdateData = (key, value) => {
    if (key === 'semester') {
      setData(prevState => ({
        ...prevState,
        semester: value,
        subject: null,
        attendanceDate: new Date(),
        sections: null,
        periodNo: null,
        periodType: null,
      }));
    } else {
      setData(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const getStudentList = () => {
    const payload = {
      EmpId: props.userDetails.Empid,
      session: props?.userDetails?.session,
      course: data?.course,
      InstituteId: props?.userDetails?.InstituteID,
      semester: data.semester,
      specialization: props.specializationsList[0].SpecilizationID,
      periotType: data.periodType,
      period: data.periodNo,
      section: data.sections,
      subject: data.subject,
      attendanceDate: moment(data?.attendanceDate).format('DD-MM-YYYY'),
    };
    const scb = res => {
      let data = res?.data?.map(item => ({
        RegNo: item?.RegNo,
        Present: 1,
        Name: item?.Name ?? '',
        RollNo: item?.RollNo ?? '',
        UniversityRollNo: item?.UniversityRollNo ?? '',
        Batch_Name: item?.Batch_Name ?? '',
        StudentID: item?.StudentID ?? '',
      }));

      setStudentData(data);
      setStudentsFilteredList(data);
      setIsModalView(false);
    };
    const ecb = () => {};

    dispatch(studentAttendanceOperations.getStudents(payload, scb, ecb));
  };

  useEffect(() => {
    if (data.sections && data?.attendanceDate) {
      getStudentList();
    }
  }, [data?.sections, data.attendanceDate, data?.periodNo, data?.periodType]);

  const markAttendance = id => {
    let currdata = [...studentData];

    let newData = currdata?.map(itm => {
      if (itm.StudentID == id) {
        if (itm?.Present) {
          itm.Present = 0;
        } else {
          itm.Present = 1;
        }
      }
      return itm;
    });
    setStudentData(newData);
  };

  const submitAttendance = e => {
    if (studentData?.length > 0) {
      const payload = {
        EmpId: props.userDetails.Empid,
        CourseID: data?.course,
        SpecId: props.specializationsList[0].SpecilizationID,
        YearID: data?.semester,
        Subjectid: data.subject,
        DateA: moment(data.attendanceDate).format('DD-MM-YYYY'),
        BatchID: data?.sections,
        Inst_ID: props?.userDetails?.InstituteID,
        SessionID: props?.userDetails?.session,
        Class1: data.periodNo?.toString(),
        periodname: data.periodNo?.toString(),
        Remark: 'P',
        Period_Type: data.periodType,
        studentData: studentData,
      };
      const scb = () => {
        commonFunctions.showSuccessMessage('Attendance Marked Successfully.');
        reset();
      };
      const ecb = () => {
        commonFunctions.showErrorMessage('Error while marking attendance');
      };

      dispatch(studentAttendanceOperations.updateAttendance(payload, scb, ecb));
    }
  };

  const reset = () => {
    setStudentData([]);
    setStudentsFilteredList([]);
    setData({
      type: null,
      course: null,
      semester: null,
      subject: null,
      attendanceDate: new Date(),
      sections: null,
      periodNo: null,
      periodType: null,
    });
  };

  return (
    <AttendanceListView
      isLoading={props.isLoading}
      isModalView={isModalView}
      toggleModal={toggleModal}
      courses={coursesList}
      data={data}
      navigation={props.navigation}
      handleUpdateData={handleUpdateData}
      semestersList={props.semestersList}
      subjectsList={props.subjectsList}
      radioButtons={radioButtons}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      setisDatePickerVisible={setisDatePickerVisible}
      isDatePickerVisible={isDatePickerVisible}
      periodTypeButtons={periodTypeButtons}
      classNumberButtons={classNumberButtons}
      sectionsList={props.sectionsList}
      filteredStudentList={filteredStudentList}
      sortButtons={sortButtons}
      markAttendance={markAttendance}
      sortBy={sortBy}
      setSortBy={setSortBy}
      setIsModalView={setIsModalView}
      inputText={inputText}
      setInputText={setInputText}
      studentsList={studentData}
      submitAttendance={submitAttendance}
      reset={reset}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  userDetails: state.login.userDetails,
  courses: state.facultyStudentAttendance?.coursesList,
  semestersList: state.facultyStudentAttendance.semestersList,
  specializationsList: state.facultyStudentAttendance.specializationsList,
  subjectsList: state.facultyStudentAttendance.subjectsList,
  sectionsList: state.facultyStudentAttendance.sectionsList,
  // studentsList: state.facultyStudentAttendance.studentsList,
});

export default connect(mapStateToProps)(AttendanceListContainer);
