import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React from 'react';

import {backgroundImage} from '../../assets/images';
import {Button, CustomHeader, HeaderWithTitle} from '../../components';
import styles from './styles';

const Marksheetview = ({marksheetData, handlePress, navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.background}>
        <HeaderWithTitle title="Marksheet" navigation={navigation} />
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
                    {marksheetData?.student_detail?.StudentName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Father name</Text>
                  <Text style={styles.name}>
                    {marksheetData?.student_detail?.FatherName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Mother name</Text>
                  <Text style={styles.name}>
                    {marksheetData?.student_detail?.MotherName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Semester/Year</Text>
                  <Text style={styles.name}>
                    {marksheetData?.student_detail?.YearSem}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Name of School</Text>
                  <Text style={styles.name}>
                    {marksheetData?.student_detail?.SchoolName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.nameheading}>Status</Text>
                  <Text style={styles.name}>
                    {marksheetData?.student_detail?.STATUS}
                  </Text>
                </View>
              </View>
              <View style={styles.rightitems}>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    Enrollment No.
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.EnrollmentNo}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    Course
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.Course}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    Examination
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.Exam}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    SGPA
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.SGPA}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    CGPA
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.CGPA}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.nameheading, styles.rightText]}>
                    Division
                  </Text>
                  <Text style={[styles.name, styles.rightText]}>
                    {marksheetData?.student_detail?.Division}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Marks details section start */}

          <View style={styles.cardsection}>
            <Text style={styles.cardheading}>Marks Details</Text>
            {marksheetData?.marks_detail?.length > 0 &&
              marksheetData?.marks_detail?.map((item, index) => (
                <View style={styles.mrkcard} key={index}>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Course Code</Text>
                    <Text style={styles.name}>{item['Course Code']}</Text>
                  </View>
                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Course Name</Text>
                    <Text style={[styles.name, styles.courseName]}>
                      {item['Course Name']}
                    </Text>
                  </View>

                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Associated Credits</Text>
                    <Text style={styles.name}>
                      {item['Associated Credits']}
                    </Text>
                  </View>

                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Grade Obtained</Text>
                    <Text style={styles.name}>{item['Grade Obtained']}</Text>
                  </View>

                  <View style={styles.itemss}>
                    <Text style={styles.nameheading}>Credits Earned</Text>
                    <Text style={styles.name}>{item['Credits Earned']}</Text>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Marksheetview;
