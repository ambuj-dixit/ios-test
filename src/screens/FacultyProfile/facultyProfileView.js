import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {
  maleProfile,
  profileIcon,
  fatherIcon,
  bloodIcon,
  categoryICon,
  addressIcon,
  contactIcon,
  dateofbirthIcon,
  countryIcon,
  stateIcon,
  cityIcon,
  zipIcon,
} from '../../assets/images';

import styles from './styles';
import {HeaderWithTitle} from '../../components';

const FacultyProfile = ({employeeDetail, navigation}) => {
  return (
    <View style={styles.container}>
      {/* Profile card   */}

      <HeaderWithTitle title="Profile" navigation={navigation} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{marginBottom: 30}}>
        <View style={styles.profilecard}>
          {employeeDetail?.Employee_Image?.Photo &&
          employeeDetail?.Employee_Image?.Photo !== 'N/A' ? (
            <Image
              source={{
                uri:
                  'data:image/png;base64,' +
                  employeeDetail?.Employee_Image?.Photo,
              }}
              style={styles.profileimage}
              onError={err => {}}
            />
          ) : (
            <Image source={maleProfile} style={styles.profileimage} />
          )}
          <View style={styles.profileuserdetail}>
            <Text style={styles.profileusername}>
              {employeeDetail?.Primary_Detail?.EmployeeName}
            </Text>
            <Text style={styles.profiledetails}>
              {employeeDetail?.Basic_detail?.Designation}
            </Text>
            <Text style={styles.profiledetails}>
              ({employeeDetail?.Basic_detail?.DepartmentName})
            </Text>
            {/* <Text style={styles.profiledetails} numberOfLines={2}>
              {employeeDetail?.Primary_Detail?.JoinDate}
            </Text> */}
          </View>
        </View>

        {/* Personal Info Card Started         */}

        <Text style={styles.infocardHeading}>Personal Information</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={contactIcon}
            infoheading="Contact No."
            infoinput={employeeDetail?.Primary_Detail?.MobileNo}
          />
          <Profilecard
            imageSource={contactIcon}
            infoheading="Email"
            infoinput={employeeDetail?.Primary_Detail?.official_Mailid}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Father Name"
            infoinput={employeeDetail?.Primary_Detail?.FatherName}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Employe Type"
            infoinput={employeeDetail?.Primary_Detail?.EmployeeType}
          />
          <Profilecard
            imageSource={bloodIcon}
            infoheading="Gender"
            infoinput={employeeDetail?.Primary_Detail?.Gender}
          />
          <Profilecard
            imageSource={dateofbirthIcon}
            infoheading="Date of Birth"
            infoinput={employeeDetail?.Primary_Detail?.Dob}
          />
          <Profilecard
            imageSource={dateofbirthIcon}
            infoheading="Date Of Joining"
            infoinput={employeeDetail?.Primary_Detail?.JoinDate}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Marital Status"
            infoinput={
              employeeDetail?.Primary_Detail?.MaritalStatus != 0
                ? employeeDetail?.Primary_Detail?.MaritalStatus
                : 'N/A'
            }
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Blood Group"
            infoinput={employeeDetail?.Primary_Detail?.BloodGroup}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Nationality"
            infoinput={employeeDetail?.Primary_Detail?.Nationality}
            isLast={true} // Set this to true for the last card
          />
        </View>

        {/* Basic Details  Card Started         */}

        <Text style={styles.infocardHeading}>Basic Detail</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={profileIcon}
            infoheading="Department"
            infoinput={employeeDetail?.Basic_detail?.DepartmentName}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Designation"
            infoinput={employeeDetail?.Basic_detail?.Designation}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Reporting Authority"
            infoinput={employeeDetail?.Basic_detail?.ReportingAuth}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Leave Authority"
            infoinput={employeeDetail?.Basic_detail?.LeaveAuth}
            isLast={true} // Set this to true for the last card
          />
        </View>

        {/* Address Info Card Started         */}

        <Text style={styles.infocardHeading}>Address</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={addressIcon}
            infoheading="Address"
            infoinput={employeeDetail?.Address_Detail?.LocalAdd}
          />
          <Profilecard
            imageSource={stateIcon}
            infoheading="State"
            infoinput={employeeDetail?.Address_Detail?.StateName}
          />
          <Profilecard
            imageSource={cityIcon}
            infoheading="City"
            infoinput={employeeDetail?.Address_Detail?.CityName}
          />
          <Profilecard
            imageSource={zipIcon}
            infoheading="ZipCode"
            infoinput={employeeDetail?.Address_Detail?.Zipcode}
            isLast={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Profilecard = ({imageSource, infoheading, infoinput, isLast}) => (
  <View style={[styles.infocarditems, !isLast && styles.devider]}>
    <Image source={imageSource} style={styles.icons} />
    <View style={styles.infocard}>
      <Text style={styles.infoheading}>{infoheading}</Text>
      <Text style={styles.infoinput}>{infoinput}</Text>
    </View>
  </View>
);

export default FacultyProfile;
