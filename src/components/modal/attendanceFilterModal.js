import React, {useEffect, useMemo, useState} from 'react';
import {Modal, View, Pressable, Text, ScrollView} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import moment from 'moment';

import styles from './style';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../../styles';
import {indent} from '../../styles/dimensions';

const AttendanceFilterModal = ({
  closeModal,
  isModalView,
  courses = [],
  data,
  handleUpdateData,
  semestersList,
  subjectsList,
  radioButtons,
  selectedId,
  setSelectedId,
  setisDatePickerVisible,
  periodTypeButtons,
  classNumberButtons,
  sectionsList,
  setIsModalView,
}) => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalRoot}>
        <View style={styles.mainContainer}>
          <Pressable
            style={styles.modalHeader}
            onPress={() => {
              closeModal(!isModalView);
            }}>
            <Text style={styles.helperText}>Select Details</Text>
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          <View style={styles.modalBody}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}>
              <View key={1} style={[styles.attendanceContainer]}>
                {/* <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout="row"
                /> */}

                {/* For course */}
                <View style={styles.attendanceView}>
                  <Text style={styles.heading}>
                    Course
                    <Text style={styles.important}>*</Text>
                  </Text>
                  <Dropdown
                    data={courses}
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    search={false}
                    onChange={event => {
                      handleUpdateData('course', event?.value);
                    }}
                    value={data?.course}
                    placeholderStyle={styles.dropdownSelectedText}
                    itemTextStyle={styles.dropdownSelectedText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    // value={selectedId}
                    placeholder="Select Course"
                  />
                </View>

                {/* For semester */}
                {semestersList?.length > 0 && (
                  <View style={styles.attendanceView}>
                    <Text style={styles.heading}>
                      Semester
                      <Text style={styles.important}>*</Text>
                    </Text>

                    <Dropdown
                      data={semestersList}
                      style={styles.dropdown}
                      labelField="Semester"
                      valueField="SID"
                      search={false}
                      onChange={event => {
                        handleUpdateData('semester', event?.SID);
                      }}
                      value={data?.semester}
                      placeholderStyle={styles.dropdownSelectedText}
                      itemTextStyle={styles.dropdownSelectedText}
                      selectedTextStyle={styles.dropdownSelectedText}
                      placeholder="Select Semester"
                    />
                  </View>
                )}

                {/* For Subject */}
                <View style={styles.attendanceView}>
                  <Text style={styles.heading}>
                    Subject
                    <Text style={styles.important}>*</Text>
                  </Text>
                  <Dropdown
                    data={subjectsList}
                    style={styles.dropdown}
                    labelField="SubjectName"
                    valueField="SubjectID"
                    search={false}
                    onChange={event => {
                      handleUpdateData('subject', event?.SubjectID);
                    }}
                    placeholderStyle={styles.dropdownSelectedText}
                    itemTextStyle={styles.dropdownSelectedText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    value={data?.subject}
                    placeholder="Select Subject"
                  />
                </View>

                {/* Attedance Date */}
                {semestersList?.length > 0 && (
                  <View style={styles.attendanceView}>
                    <Text style={styles.heading}>
                      Attedance Date
                      <Text style={styles.important}>*</Text>
                    </Text>
                    <Pressable
                      onPress={() => setisDatePickerVisible(true)}
                      style={styles.dateInput}>
                      <Text style={styles.dropdownSelectedText}>
                        {moment(data?.attendanceDate).format('DD/MM/YYYY')}
                      </Text>
                      <Fontisto
                        name="date"
                        color={colors.black}
                        size={indent}
                      />
                    </Pressable>
                  </View>
                )}

                {/* For Period Type */}
                <View style={styles.attendanceView}>
                  <Text style={styles.heading}>
                    Period Type
                    <Text style={styles.important}>*</Text>
                  </Text>
                  <Dropdown
                    data={periodTypeButtons}
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    search={false}
                    onChange={event => {
                      handleUpdateData('periodType', event.value);
                    }}
                    value={data?.periodType}
                    placeholderStyle={styles.dropdownSelectedText}
                    itemTextStyle={styles.dropdownSelectedText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    placeholder="Select Period Type"
                  />
                </View>

                {/* For Class number */}
                <View style={styles.attendanceView}>
                  <Text style={styles.heading}>
                    Class Number
                    <Text style={styles.important}>*</Text>
                  </Text>
                  <Dropdown
                    data={classNumberButtons}
                    style={styles.dropdown}
                    labelField="label"
                    valueField="value"
                    search={false}
                    onChange={event => {
                      handleUpdateData('periodNo', event.value);
                    }}
                    value={data?.periodNo}
                    placeholderStyle={styles.dropdownSelectedText}
                    itemTextStyle={styles.dropdownSelectedText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    placeholder="Select Class No."
                  />
                </View>

                <View style={styles.attendanceView}>
                  <Text style={styles.heading}>
                    Section
                    <Text style={styles.important}>*</Text>
                  </Text>
                  <Dropdown
                    data={sectionsList}
                    style={styles.dropdown}
                    labelField="Batch_Name"
                    valueField="Batch_ID"
                    search={false}
                    onChange={event => {
                      handleUpdateData('sections', event.Batch_ID);
                    }}
                    value={data?.sections}
                    placeholderStyle={styles.dropdownSelectedText}
                    itemTextStyle={styles.dropdownSelectedText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    placeholder="Select Section"
                  />
                </View>
              </View>

              {/* <Button
                title="Submit"
                buttonStyle={styles.button}
                onPress={() => {
                  setIsModalView(false);
                }}
              /> */}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AttendanceFilterModal;
