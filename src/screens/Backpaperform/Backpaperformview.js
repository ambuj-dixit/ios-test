import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';
import {colors} from '../../styles';
import {backgroundImage, downloadReceipt} from '../../assets/images';
import {Button, HeaderWithTitle} from '../../components';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {doubleIndent} from '../../styles/dimensions';

const Backpaperformview = ({
  academicDetails,
  navigation,
  handleDownloadReport,
  selectedExam,
  backpaperExamName,
  handleBackPaperExamChange,
  backPaperSemesters,
  grades,
  handleSemesterChange,
  paidSubjectsFields,
  selectedYear,
  backpaperSubjects,
  handleCourseChange,
  selectedCourse,
  handleAddSubject,
  handleDownloadReceipt,
  selectedGrade,
  handleGradeChange,
  unpaidSubjects,
  deleteSubject,
  showSubject,
  setShowSubjects,
  handlePayment,
  eachSubjectAmount,
  paidSubjects,
  showPaidSubjects,
  setshowPaidSubjects,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Reappear Exam Form" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputcontainer}>
            <View style={styles.inputitems}>
              <View>
                <Text style={styles.cardheading}>Student Detail</Text>
              </View>
              <Text style={styles.labels}>Student Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                editable={false}
                value={academicDetails?.StudentName}
                autoCapitalize="none"
              />
              <Text style={styles.labels}>Enrollment No.</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder="Enrollment No."
                autoCapitalize="none"
                editable={false}
                value={academicDetails?.RegNo}
              />
              <Text style={styles.labels}>Father's Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder="Father Name"
                autoCapitalize="none"
                editable={false}
                value={academicDetails?.FatherName}
              />
              <Text style={styles.labels}>Mother's Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder="Mother Name"
                autoCapitalize="none"
                editable={false}
              />
              <Text style={styles.labels}>Name of School</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder=""
                editable={false}
                value={academicDetails?.SchoolName}
                autoCapitalize="none"
              />
              <Text style={styles.labels}>Programme</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                placeholder="Programme Name"
                autoCapitalize="none"
                editable={false}
                multiline
                value={academicDetails?.CourseName}
              />

              <Text style={styles.labels}>Exam Name</Text>
              <Dropdown
                data={backpaperExamName || []}
                style={styles.dropdown}
                labelField="Title_Name"
                valueField="Title_Name"
                search={false}
                onChange={event => {
                  handleBackPaperExamChange(event);
                }}
                placeholder="Select ExamName"
                selectedTextStyle={styles.dropdownSelectedText}
                value={selectedExam}
                placeholderStyle={styles.dropdownSelectedText}
                itemTextStyle={styles.dropdownSelectedText}
              />

              <Text style={styles.labels}>Year/Semester</Text>
              <Dropdown
                data={backPaperSemesters || []}
                style={styles.dropdown}
                labelField="SemesterYear"
                valueField="SID"
                search={false}
                onChange={event => {
                  handleSemesterChange(event);
                }}
                placeholder="Select"
                selectedTextStyle={styles.dropdownSelectedText}
                value={selectedYear}
                itemTextStyle={styles.dropdownSelectedText}
                placeholderStyle={styles.dropdownSelectedText}
              />
            </View>
          </View>

          <View style={styles.cardsection}>
            <View style={styles.subjectsHeader}>
              <Text style={styles.cardheading}>Subject Detail</Text>
              <Pressable onPress={() => setShowSubjects(!showSubject)}>
                <MaterialIcons
                  name={showSubject ? 'expand-less' : 'expand-more'}
                  color={colors.black}
                  size={doubleIndent}
                />
              </Pressable>
            </View>

            {showSubject &&
              unpaidSubjects?.length > 0 &&
              unpaidSubjects.map((eachSubject, index) => (
                <View
                  style={[styles.card, styles.subjectCard]}
                  key={`${eachSubject?.SubjectId} ${eachSubject?.LastGrade}`}>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Sr No.</Text>
                    <Text style={styles.name}>{index + 1}</Text>
                  </View>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Year/Semester</Text>
                    <Text style={styles.name}>{eachSubject?.YearSem}</Text>
                  </View>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Course Name(Code)</Text>
                    <Text style={styles.name}>{eachSubject?.SubjectName}</Text>
                  </View>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>
                      Grade Obtained in Last Examination
                    </Text>
                    <Text style={styles.name}>{eachSubject?.LastGrade}</Text>
                  </View>
                  <Button
                    title="Remove"
                    buttonStyle={styles.deleteButton}
                    onPress={() => deleteSubject(eachSubject)}
                  />
                </View>
              ))}

            {showSubject && unpaidSubjects?.length === 0 && (
              <Text style={styles.noSubject}>No Subjects Selected</Text>
            )}
          </View>

          {paidSubjects?.length > 0 && (
            <View style={styles.cardsection}>
              <View style={styles.subjectsHeader}>
                <Text style={styles.cardheading}>Paid Subject Detail</Text>
                <View style={styles.paidSubjectHeader}>
                  <Pressable onPress={handleDownloadReport}>
                    <Text style={styles.reportButton}>Download Report</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setshowPaidSubjects(!showPaidSubjects)}>
                    <MaterialIcons
                      name={showPaidSubjects ? 'expand-less' : 'expand-more'}
                      color={colors.black}
                      size={doubleIndent}
                    />
                  </Pressable>
                </View>
              </View>

              {showPaidSubjects &&
                paidSubjects?.length > 0 &&
                paidSubjects.map((eachSubject, index) => (
                  <View
                    style={[styles.card, styles.subjectCard]}
                    key={`${eachSubject?.SubjectId} ${eachSubject?.LastGrade}`}>
                    <View style={styles.itemss}>
                      <Text style={styles.nameheading}>Sr No.</Text>
                      <Text style={styles.name}>{index + 1}</Text>
                    </View>
                    {paidSubjectsFields.map(field => (
                      <View style={styles.itemss} key={field?.name}>
                        <Text style={styles.nameheading}>{field?.label}</Text>
                        <Text style={styles.name}>
                          {eachSubject[field.name]}
                        </Text>
                      </View>
                    ))}
                    <Pressable
                      style={styles.downloadButton}
                      onPress={() => handleDownloadReceipt(eachSubject)}>
                      <Text style={styles.downloadText}>Download Receipt</Text>
                      <Image
                        source={downloadReceipt}
                        style={styles.downloadReceipt}
                        resizeMode="contain"
                      />
                    </Pressable>
                  </View>
                ))}
            </View>
          )}

          <View style={styles.cardsection}>
            <Text style={styles.cardheading}>Add Subjects</Text>
            <View style={styles.card}>
              <Dropdown
                data={backpaperSubjects || []}
                style={styles.dropdown}
                labelField="SubjectName"
                valueField="SUbjectID"
                search={false}
                onChange={event => {
                  handleCourseChange(event);
                }}
                placeholder="Select Course"
                selectedTextStyle={styles.dropdownSelectedText}
                value={selectedCourse}
                itemTextStyle={styles.dropdownSelectedText}
                placeholderStyle={styles.dropdownSelectedText}
              />

              <Dropdown
                data={grades || []}
                style={styles.dropdown}
                labelField="Grade"
                valueField="Grade"
                search={false}
                onChange={event => {
                  handleGradeChange(event);
                }}
                placeholder="Select Grade Obtained in Last Examination"
                selectedTextStyle={styles.dropdownSelectedText}
                value={selectedGrade}
                dropdownPosition="top"
                itemTextStyle={styles.dropdownSelectedText}
                placeholderStyle={styles.dropdownSelectedText}
              />
              <Button
                title="Add Subject"
                buttonStyle={[styles.payButton, styles.addButton]}
                onPress={handleAddSubject}
              />
            </View>
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.totalPaidText}>
              Total Paid Amount:{' '}
              {unpaidSubjects?.length === 0
                ? '0'
                : unpaidSubjects?.length * eachSubjectAmount}{' '}
              ₹
            </Text>
            <Button
              title="Pay Now"
              buttonStyle={styles.payButton}
              onPress={handlePayment}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Backpaperformview;
