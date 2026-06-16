import React, {useCallback} from 'react';
import {
  Text,
  View,
  Pressable,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import { backgroundImage} from '../../../assets/images';
import {HeaderWithTitle} from '../../../components';

const AddAttedanceView = ({
  attendanceSubjectWise,
  navigation,
  onCardPress,
  isLoading,
}) => {
  const AttendanceCard = useCallback(({eachSubject}) => {
    return (
      <Pressable style={styles.card} onPress={() => onCardPress(eachSubject)}>
        <View style={styles.cardheader}>
          <Text style={styles.SubjectName}>{eachSubject?.SubjectName}</Text>
          <Text style={styles.view}>View</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.heading}>Attendance Percentage</Text>
          <Text style={styles.item}>{eachSubject.AttendancePercentage} %</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.heading}>Total Lectures</Text>
          <Text style={styles.item}>{eachSubject.TotalLectureConducted}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.heading}>Lectures Attended</Text>
          <Text style={styles.item}>{eachSubject.TotalLectureAttend}</Text>
        </View>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle
          title="Subject Wise Attendance"
          navigation={navigation}
        />
        <View style={styles.mainview}>
          {/* <Text style={styles.attendaceText}>Attendance</Text> */}
          <ScrollView>
            {attendanceSubjectWise?.length > 0 &&
              attendanceSubjectWise.map((eachSubject, index) => (
                <AttendanceCard
                  key={eachSubject.Subject_id}
                  eachSubject={eachSubject}
                />
              ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AddAttedanceView;
