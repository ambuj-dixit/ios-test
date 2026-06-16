import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React from 'react';

import {backgroundImage} from '../../assets/images';
import {Button, CustomHeader, HeaderWithTitle} from '../../components';
import styles from './styles';

const AdminCardView = ({admitCardDetail, handlePress, navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Admit Card" navigation={navigation} />
        <ScrollView bounces={false}>
          {/* Student detail section started */}

          <View style={styles.cardsection}>
            <View style={styles.flexRow}>
              <Text style={styles.cardheading}>Student Details</Text>
              <Button
                title="Print"
                onPress={handlePress}
                buttonStyle={styles.custom}
              />
            </View>
            <View style={styles.card}>
              <View style={styles.leftitems}>
                <View>
                  <Text style={styles.nameheading}>Student name</Text>
                  <Text style={styles.name}>
                    {admitCardDetail?.student_detail?.StudentName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Enrollment No.</Text>
                  <Text style={styles.name}>
                    {admitCardDetail?.student_detail?.RegNo}
                  </Text>
                </View>
              </View>
              <View style={styles.rightitems}>
                <View>
                  <Text style={styles.nameheading}>Father name</Text>
                  <Text style={styles.name}>
                    {admitCardDetail?.student_detail?.FatherName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Semester/Year</Text>
                  <Text style={styles.name}>
                    {admitCardDetail?.student_detail?.YearSem}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.cardsection}>
            <Text style={styles.cardheading}>Subject Details</Text>
            {admitCardDetail?.subject_detail?.map((item, idx) => (
              <View style={styles.mrkcard} key={idx}>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>S. No.</Text>
                  <Text style={[styles.name, styles.flex2]}>123</Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Course Name
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.SubjectName}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>Fees</Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.Amount}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Semester/Year
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.YearSem}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Transaction ID
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.TranId}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Receipt No.
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.Receipt_No}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Grade Obtained in Last Examination
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.LastGrade}
                  </Text>
                </View>
                <View style={styles.itemss}>
                  <Text style={[styles.nameheading, styles.flex1]}>
                    Transaction Date
                  </Text>
                  <Text style={[styles.name, styles.flex2]}>
                    {item?.TranDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AdminCardView;
