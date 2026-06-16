import {hideLoader, showLoader} from '../../components/appLoader';
import {API} from '../../services';
import {setCourses,setSections,setSemesters,setSpecializations,setStudents,setSubjects,} from './actions';

const noop = () => {};
const getCourses =
(data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setStudents([]));
    dispatch(setCourses([]));
    dispatch(setSemesters([]));

    API.get(`AllCoursesFaculty_wise?Empid=${data?.EmpId}`)
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setCourses(res.data?.data));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getSemesters =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSemesters([]));
    API.get(
      `Semester_AssignToFaculty?Empid=${data?.EmpId}&session=${data?.session}&courseid=${data?.course}&InstituteId=${data?.InstituteId}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setSemesters(res.data.data));
          successCallback(res.data.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getSpecializations =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSpecializations([]));
    API.get(
      `Specialization_AssignToFaculty?Empid=${data?.EmpId}&session=${data?.session}&courseid=${data?.course}&InstituteID=${data?.InstituteId}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setSpecializations(res.data.data));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getSubjects =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSubjects([]));
    dispatch(setStudents([]));

    API.get(
      `Subject_AssignToFaculty?Empid=${data?.EmpId}&Semesterid=${data?.semester}&sessionid=${data?.session}&Specilizationid=${data?.specialization}&courseid=${data?.course}&InstituteId=${data?.InstituteId}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setSubjects(res.data.data));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getSections =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setSections([]));
    API.get(
      `Section_AssignToFaculty?Empid=${data?.EmpId}&SemesterID=${data?.semester}&Session=${data?.session}&SpecilizationID=${data?.specialization}&CourseId=${data?.course}&InstituteID=${data?.InstituteId}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          dispatch(setSections(res.data.data));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const getStudents =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();
    dispatch(setStudents([]));

    API.get(
      `StudentList_SubjectWise?Empid=${data?.EmpId}&SemesterID=${data?.semester}&SessionID=${data?.session}&SpecID=${data?.specialization}&CourseID=${data?.course}&InstID=${data?.InstituteId}&SemID=${data?.semester}&SubjectID=${data?.subject}&AttDate=${data?.attendanceDate}&BatchID=${data?.section}&PeriodNo=${data?.period}&PeriodType=${data?.periotType}`,
    )
      .then(res => {
        if (res?.data?.status === 'Success') {
          let students = res.data?.data;
          dispatch(setStudents(students));
          successCallback(res.data);
          hideLoader();
        } else {
          hideLoader();
          failureCallback();
        }
      })
      .catch(err => {
        hideLoader();
        failureCallback(err);
      });
  };

const updateAttendance =
  (data, successCallback = noop, failureCallback = noop) =>
  dispatch => {
    showLoader();

    try {
      data?.studentData?.map(item => {
        const payload = {
          EmpId: data?.EmpId,
          CourseID: data?.CourseID,
          SpecId: data?.SpecId,
          YearID: data?.YearID,
          Subjectid: data?.Subjectid,
          DateA: data?.DateA,
          BatchID: data?.BatchID,
          Present: item?.Present ? '1' : '0',
          Absent: item?.Present ? '0' : '1',
          StudentID: item?.StudentID,
          Inst_ID: data?.Inst_ID,
          SessionID: data?.SessionID,
          Class1: data?.Class1,
          periodname: data?.periodname,
          Remark: item?.Present ? 'P' : 'A',
          Period_Type: data.Period_Type,
        };
        API.post('InsertStudentAttendance', payload, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then(res => {})
          .catch(err => {});
      });
      hideLoader();
      successCallback();
    } catch (e) {
      hideLoader();
    }
  };

export default {
  getCourses,
  getSemesters,
  getSpecializations,
  getSubjects,
  getSections,
  getStudents,
  updateAttendance,
};
