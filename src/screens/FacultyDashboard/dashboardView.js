import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {maleProfile} from '../../assets/images';
import {CustomHeader} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {indent} from '../../styles/dimensions';
import {colors} from '../../styles';

const Home = ({
  navigation,
  handleNavigate,
  dashboardDetails,
  instituteDetails,
  attendance,
  handleClockIn,
  onRefresh,
  isLocationModalVisible,
  setisLocationModalVisible,
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    if (dashboardDetails && instituteDetails && attendance) {
      setLoading(false);
    }
  }, [dashboardDetails, instituteDetails, attendance]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CustomHeader
        instituteDetails={instituteDetails}
        navigation={navigation}
        screenName="dashboard"
        userType="faculty"
        setisLocationModalVisible={setisLocationModalVisible}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          <View
            style={[
              {
                width: '90%',
                marginHorizontal: '5%',
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View style={[styles.clockIn]}>
              <Icon4 name="clock-o" size={25} color={'white'} />
              <Text style={styles.clockText}>
                Clock In{'\n'}
                <Text>{attendance?.intime}</Text>
              </Text>
            </View>
            <View style={[styles.clockOut]}>
              <Icon4 name="clock-o" size={25} color={'white'} />
              <Text style={styles.clockText}>
                Clock Out{'\n'}
                <Text>{attendance?.outtime}</Text>
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.shadowProp,
              {width: '90%', marginHorizontal: '5%', marginTop: 5},
            ]}>
            {dashboardDetails?.Employee_Image?.Photo &&
            dashboardDetails?.Employee_Image?.Photo !== 'N/A' ? (
              <Image
                source={{
                  uri:
                    'data:image/png;base64,' +
                    dashboardDetails?.Employee_Image?.Photo,
                }}
                resizeMode="contain"
                style={styles.maleProfile}
              />
            ) : (
              <Image
                source={maleProfile}
                resizeMode="contain"
                style={styles.maleProfile}
              />
            )}
            <Text style={styles.name}>
              {dashboardDetails?.Primary_Detail?.EmployeeName}
            </Text>

            <View style={{paddingBottom: 15}}>
              <View style={styles.studentNameCard}>
                <Text style={styles.profileText}>
                  {dashboardDetails?.Basic_detail?.Designation}
                  {'\n'}
                  <Text style={styles.bold}>
                    ({dashboardDetails?.Basic_detail?.DepartmentName})
                  </Text>
                </Text>
              </View>
              {/* <View style={styles.studentNameCard}>
                <Text style={styles.profileText}>
                  DOJ : {dashboardDetails?.Primary_Detail?.JoinDate}
                </Text>
              </View> */}
            </View>
          </View>

          <View style={styles.dashboardIcon}>
            {/* <TouchableOpacity
              onPress={() => handleNavigate('STUDENT_ATTENDANCE')}
              activeOpacity={0.75}>
              <View style={styles.icon}>
                <Icon
                  name={'user-check'}
                  size={(indent * 3) / 2}
                  color={colors.black}
                />
              </View>
              <Text style={styles.iconText}>Student{'\n'}Attendance</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => handleNavigate('FACULTY_PROFILE')}
              activeOpacity={0.75}>
              <View style={styles.icon}>
                <Icon
                  name={'user-tie'}
                  size={(indent * 3) / 2}
                  color={colors.white}
                />
              </View>
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.instDetails}>
            <Text style={styles.Location}>{instituteDetails?.CollegeName}</Text>
            <Text style={styles.Location}>{instituteDetails?.Location}</Text>
            <Text style={styles.Location}>{instituteDetails?.WebSite}</Text>
          </View>
        </ScrollView>
      </View>

      {isLocationModalVisible && (
        <Modal
          transparent
          visible={isLocationModalVisible}
          animationType="fade">
          <View style={styles.modalRoot}>
            <View style={styles.modalBody}>
              <Text style={styles.modalHeader}>Mark Attendance</Text>
              <View style={styles.attendanceRecord}>
                <Text style={[styles.bold, styles.width60]}>In Time</Text>
                <Text style={styles.inTime}>: {attendance?.intime}</Text>
              </View>
              <View style={styles.attendanceRecord}>
                <Text style={[styles.bold, styles.width60]}>Out Time</Text>
                <Text style={styles.inTime}>: {attendance?.outtime}</Text>
              </View>
              <View style={styles.attendanceRecord}>
                <Text style={[styles.bold, styles.width60]}>Working Hours</Text>
                <Text style={styles.inTime}>: {attendance?.workhour}</Text>
              </View>
              <View style={styles.attendanceRecord}>
                <Text style={[styles.bold, styles.width60]}>In Location</Text>
                <Text style={styles.inTime}>: {attendance?.InLocation}</Text>
              </View>
              <View style={styles.attendanceRecord}>
                <Text style={[styles.bold, styles.width60]}>Out Location</Text>
                <Text style={styles.inTime}>: {attendance?.OutLocation}</Text>
              </View>

              <View style={styles.modalButtonContainer}>
                {attendance && attendance?.intime === '00:00' ? (
                  <Pressable
                    style={styles.clockInbutton}
                    onPress={handleClockIn}>
                    <Icon4 name="clock-o" size={15} color={'white'} />
                    <Text style={styles.clockInText}>Clock In</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: colors.red,
                      width: 100,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderRadius: 3,
                      alignItems: 'center',
                    }}
                    onPress={handleClockIn}>
                    <Icon4 name="clock-o" size={15} color={'white'} />
                    <Text style={{color: colors.white, padding: 5}}>
                      Clock Out
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  style={[styles.clockInbutton, styles.closeButton]}
                  onPress={() => setisLocationModalVisible(false)}>
                  <Icon4 name="close" size={15} color={'white'} />
                  <Text style={styles.clockInText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Home;
