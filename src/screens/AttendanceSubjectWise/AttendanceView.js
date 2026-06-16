import React, {useCallback, useMemo} from 'react';
import {Text, View, Pressable, ImageBackground, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';

import {backgroundImage} from '../../assets/images';
import {CustomHeader} from '../../components';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AttedanceView = ({attendanceSubjectWise, navigation, onCardPress, instituteDetails}) => {
  
  const overallAttendancePercentage = useMemo(() => {
    if (attendanceSubjectWise && attendanceSubjectWise.length > 0) {
      const totalLecturesAttended = attendanceSubjectWise.reduce(
        (acc, subject) => acc + (parseFloat(subject.TotalLectureAttend) || 0),
        0
      );
      const totalLecturesConducted = attendanceSubjectWise.reduce(
        (acc, subject) => acc + (parseFloat(subject.TotalLectureConducted) || 0),
        0
      );

      if (totalLecturesConducted === 0) return 0;

      const overallPercentage = (totalLecturesAttended / totalLecturesConducted) * 100;
      return overallPercentage.toFixed(2);
    }
    return 0;
  }, [attendanceSubjectWise]);

  const AttendanceCard = useCallback(({eachSubject}) => {
    const percentage = parseFloat(eachSubject.AttendancePercentage) || 0;
    const statusColor = percentage < 75 ? '#F34336' : '#4CAF50'; // Red for low, Green for good

    return (
      <Pressable style={styles.modernCard} onPress={() => onCardPress(eachSubject)}>
        <View style={[styles.leftStrip, { backgroundColor: statusColor }]} />
        <View style={styles.cardContent}>
          <View style={styles.cardMain}>
            <Text style={styles.subjectTitle}>{eachSubject?.SubjectName}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Attended</Text>
                <Text style={styles.statValue}>{eachSubject.TotalLectureAttend}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{eachSubject.TotalLectureConducted}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.percentageBox}>
                <Text style={[styles.percentageValue, { color: statusColor }]}>
                  {eachSubject.AttendancePercentage}%
                </Text>
              </View>
            </View>
          </View>
          <MIcon name="chevron-right" size={24} color="#D1D5DB" />
        </View>
      </Pressable>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CustomHeader
        instituteDetails={instituteDetails}
        navigation={navigation}
      />
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.screenTitle}>Academic Attendance</Text>
          <View style={styles.overallBadge}>
             <Text style={styles.overallLabel}>Overall</Text>
             <Text style={styles.overallValue}>{overallAttendancePercentage}%</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {attendanceSubjectWise?.length > 0 ? (
            attendanceSubjectWise.map((eachSubject) => (
              <AttendanceCard
                key={eachSubject.Subject_id}
                eachSubject={eachSubject}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MIcon name="calendar-remove-outline" size={60} color="#E5E7EB" />
              <Text style={styles.emptyText}>No attendance records found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AttedanceView;

