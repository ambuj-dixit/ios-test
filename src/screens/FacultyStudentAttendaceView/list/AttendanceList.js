import React, { useCallback } from "react";
import { Text,View,Pressable,ImageBackground,ScrollView,FlatList,TextInput,} from "react-native";
import styles from "./styles";
import { backgroundImage } from "../../../assets/images";
import { HeaderWithTitle } from "../../../components";
import AttendanceFilterModal from "../../../components/modal/attendanceFilterModal";
import { colors } from "../../../styles";
import DatePicker from "react-native-date-picker";
import CheckBox from "@react-native-community/checkbox";
import { halfIndent, indent } from "../../../styles/dimensions";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AttedanceListView = ({
  navigation,
  courses = [],
  toggleModal,
  isModalView,
  data,
  handleUpdateData,
  semestersList,
  subjectsList,
  radioButtons,
  selectedId,
  setSelectedId,
  setisDatePickerVisible,
  isDatePickerVisible,
  periodTypeButtons,
  classNumberButtons,
  sectionsList,
  filteredStudentList,
  markAttendance,
  setIsModalView,
  sortButtons,
  sortBy,
  setSortBy,
  inputText,
  setInputText,
  studentsList,
  submitAttendance,
  reset,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}
      >
        <HeaderWithTitle title="Student Attendance" navigation={navigation} />
        <View style={styles.mainview}>
          <View style={styles.btnFilterView}>
            <TextInput
              style={styles.input}
              placeholder="Search by Name"
              placeholderTextColor={colors.placeholder}
              value={inputText}
              onChangeText={setInputText}
            />
            <Dropdown
              data={sortButtons}
              labelField="label"
              valueField="value"
              value={sortBy}
              selectedTextStyle={styles.sortDropdownText}
              itemTextStyle={styles.sortDropdownText}
              style={styles.sortDropdown}
              onChange={(e) => {
                setSortBy(e.value);
              }}
              placeholder="Sort By"
            />
            <Pressable
              style={[styles.btnFilter]}
              onPress={() => toggleModal(!isModalView)}
            >
              <Icon name="filter-outline" style={[styles.btnText]} />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.black3,
                paddingVertical: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.blue,
                  fontWeight: "bold",
                }}
              >
                Total: {filteredStudentList?.length}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.black3,
                paddingVertical: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.blue,
                  fontWeight: "bold",
                }}
              >
                Present:{" "}
                {
                  filteredStudentList?.filter((itm) => itm?.Present == 1)
                    ?.length
                }
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.black3,
                paddingVertical: 5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.red,
                  fontWeight: "bold",
                }}
              >
                Absent:{" "}
                {
                  filteredStudentList?.filter((itm) => itm?.Present == 0)
                    ?.length
                }
              </Text>
            </View>
          </View>
          
            {filteredStudentList?.length > 0 ? (
              <View>
                <FlatList
                  data={filteredStudentList}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.cardMain}
                      key={item?.RollNo}
                      onPress={() => {
                        markAttendance(item.StudentID);
                      }}
                    >
                      <View style={styles.cardheader}>
                        <View style={styles.cardTop}>
                          <Text
                            style={[
                              styles.studentCardHeading,
                              {
                                color: item?.Present
                                  ? colors.black
                                  : colors.red,
                              },
                            ]}
                          >
                            {item?.Name}
                          </Text>
                          <Pressable
                            style={styles.markAttView}
                            onPress={() => {
                              markAttendance(item.StudentID);
                            }}
                          >
                            <CheckBox
                              style={styles.checkbox}
                              boxType="square"
                              value={item?.Present === 1}
                              tintColor={colors.blue}
                              onTintColor={colors.blue}
                              onCheckColor={colors.blue}
                              tintColors={{
                                false: colors.red,
                              }}
                              onClick={() => {
                                markAttendance(item.StudentID);
                              }}
                            />
                            <Text
                              style={[
                                styles.infoText,
                                { marginLeft: halfIndent },
                                {
                                  color: item?.Present
                                    ? colors.black
                                    : colors.red,
                                },
                              ]}
                            >
                              {item?.Present ? "P" : "A"}
                            </Text>
                          </Pressable>
                        </View>
                      </View>

                      <View style={styles.cardBottom}>
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text style={styles.sectionText}>Section</Text>
                          <Text
                            style={[
                              { fontSize: 12, textAlign: "right" },
                              {
                                color: item?.Present
                                  ? colors.black
                                  : colors.red,
                              },
                            ]}
                          >
                            {item.Batch_Name ?? ""}
                          </Text>
                        </View>

                        <View style={styles.leftCard}>
                          <Text
                            style={{ fontSize: 12, color: colors.placeholder }}
                          >
                            Roll No.
                          </Text>
                          <Text
                            style={[
                              styles.infoText,
                              {
                                color: item?.Present
                                  ? colors.black
                                  : colors.red,
                              },
                            ]}
                          >
                            {item.RollNo ?? ""}
                          </Text>
                        </View>

                        <View style={{}}>
                          <Text
                            style={{ fontSize: 12, color: colors.placeholder }}
                          >
                            Uni. Roll No.
                          </Text>
                          <Text
                            style={[
                              { fontSize: 12 },
                              {
                                color: item?.Present
                                  ? colors.black
                                  : colors.red,
                              },
                            ]}
                          >
                            {item?.UniversityRollNo ?? ""}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            ) : (
              <Text style={styles.noData}>No Students List</Text>
            )}
        
          {filteredStudentList?.length > 0 && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.resetButton, { backgroundColor: colors.blue }]}
                onPress={submitAttendance}
              >
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
              <Pressable style={styles.resetButton} onPress={reset}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ImageBackground>
      {isModalView ? (
        <AttendanceFilterModal
          closeModal={toggleModal}
          isModalView={isModalView}
          courses={courses}
          data={data}
          handleUpdateData={handleUpdateData}
          semestersList={semestersList}
          subjectsList={subjectsList}
          radioButtons={radioButtons}
          periodTypeButtons={periodTypeButtons}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setisDatePickerVisible={setisDatePickerVisible}
          classNumberButtons={classNumberButtons}
          sectionsList={sectionsList}
          setIsModalView={setIsModalView}
        />
      ) : null}

      <DatePicker
        modal={true}
        open={isDatePickerVisible}
        date={data?.attendanceDate}
        mode="date"
        maximumDate={new Date()}
        onCancel={() => {
          setisDatePickerVisible(false);
        }}
        onConfirm={(date) => {
          handleUpdateData("attendanceDate", date);
          setisDatePickerVisible(false);
        }}
      />
    </View>
  );
};

export default AttedanceListView;
