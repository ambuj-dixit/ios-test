import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {attedanceOperations} from '../../reduxOperations/attendance';
import {Platform, UIManager} from 'react-native';

import AttendanceView from './AttendanceView';
import commonFunctions from '../../utils';
import {colors} from '../../styles';
import {showErrorMessage} from '../../utils/commonFunctions';

const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const AttendanceContainer = props => {
  const dispatch = useDispatch();
  const [markedDates, setmarkedDates] = useState({});
  const [open, setOpen] = useState(false);
  const [subjectcode, setSubjetcode] = useState('');
  const [currentdata, setCurrentData] = useState([]);

  useEffect(() => {
    if (props.userDetails && props?.route?.params?.Subject_id) {
      const payload = {
        studentId: props.userDetails.StudentId,
        InstituteID: props.userDetails.InstituteID,
        CurrentSemID: props.userDetails.CurrentSemID,
        SubjectID: props.route.params.Subject_id,
      };
      const onSuccess = res => {
        let dates = {};

        if (res?.data?.SubjectName) {
          setSubjetcode(res?.data?.SubjectName);
        } else {
          setSubjetcode('');
        }

        if (res?.Attendance_Details?.length > 0) {
          res?.Attendance_Details.map(eachItem => {
            if (eachItem.Date) {
              let [day, monthStr, year] = eachItem.Date.split(' ');
              const month = months[monthStr];

              if (dates[`${year}-${month}-${day}`]?.dots) {
                dates[`${year}-${month}-${day}`].dots.push({
                  key: 'Attendance',
                  color: colors.white,
                });
              } else {
                if (eachItem?.Present === '1') {
                  dates[`${year}-${month}-${day}`] = {
                    dots: [{key: 'Attendance', color: colors.white}],
                    selected: true,
                  };
                }
                if (eachItem?.Present === '0') {
                  dates[`${year}-${month}-${day}`] = {
                    selectedColor: colors.red,
                    selected: true,
                  };
                }
              }
            }
          });

          setmarkedDates(dates);
        }
      };
      const onFailure = err => {
        if (err?.data?.status === 'Fail') {
          showErrorMessage(err.data.message);
        }
      };
      dispatch(
        attedanceOperations.getAttendanceSubjectWise(
          payload,
          onSuccess,
          onFailure,
        ),
      );
    }
  }, []);

  const togglePopup = () => {
    setOpen(t => !t);
  };

  const setDataForPopup = data => {
    let item = markedDates[data.dateString];
    if (item?.selectedColor === 'red') {
      setCurrentData({
        present: 0,
        absent: 1,
        date: data.dateString,
        total: 1,
      });
      setOpen(true);
    } else {
      if (item?.dots?.length) {
        setCurrentData({
          present: item.dots.length,
          absent: 0,
          total: item.dots.length,
          date: data.dateString,
        });
        setOpen(true);
      } else {
        showErrorMessage(`No data for ${data.dateString}`);
      }
    }
  };

  return (
    <AttendanceView
      isLoading={props.isLoading}
      attendanceSubjectWise={props.attendanceSubjectWise}
      markedDates={markedDates}
      open={open}
      setOpen={setOpen}
      togglePopup={togglePopup}
      subjectcode={subjectcode}
      navigation={props.navigation}
      currentdata={currentdata}
      setDataForPopup={setDataForPopup}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  userDetails: state.login.userDetails,
  attendanceSubjectWise: state.attendance.attendanceSubjectWise,
});

export default connect(mapStateToProps)(AttendanceContainer);
