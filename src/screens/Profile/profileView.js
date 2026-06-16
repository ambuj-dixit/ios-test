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

const Profile = ({profileData, navigation}) => {
  return (
    <View style={styles.container}>
      {/* Profile card   */}

      <HeaderWithTitle title="Profile" navigation={navigation} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.profilecard}>
          {profileData?.Photo && profileData?.Photo !== 'N/A' ? (
            <Image
              source={{uri: 'data:image/png;base64,' + profileData?.Photo}}
              style={styles.profileimage}
              onError={err => {}}
            />
          ) : (
            <Image source={maleProfile} style={styles.profileimage} />
          )}
          <View style={styles.profileuserdetail}>
            <Text
              style={styles.profileusername}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {profileData?.StudentName}
            </Text>
            <Text style={styles.profiledetails}>{profileData?.Gender}</Text>
            <Text style={styles.profiledetails}>{profileData?.ContactNo}</Text>
            <Text style={styles.profiledetails} numberOfLines={2}>
              {profileData?.Email}
            </Text>
          </View>
        </View>

        {/* Personal Info Card Started         */}

        <Text style={styles.infocardHeading}>Personal Information</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={fatherIcon}
            infoheading="Father Name"
            infoinput={profileData?.FatherName}
          />
          <Profilecard
            imageSource={profileIcon}
            infoheading="Mother Name"
            infoinput={profileData?.MotherName}
          />
          <Profilecard
            imageSource={bloodIcon}
            infoheading="Blood Group"
            infoinput={profileData?.BloodGroup}
          />
          <Profilecard
            imageSource={categoryICon}
            infoheading="Category"
            infoinput={profileData?.CCategory}
          />
          <Profilecard
            imageSource={dateofbirthIcon}
            infoheading="Date Of Birth"
            infoinput={profileData?.DateofBirth}
          />
          <Profilecard
            imageSource={contactIcon}
            infoheading="Father's Contact No.	"
            infoinput={profileData?.FatherContactNo}
            isLast={true} // Set this to true for the last card
          />
        </View>

        {/* Address Info Card Started         */}

        <Text style={styles.infocardHeading}>Permanent Address</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={addressIcon}
            infoheading="Permanent"
            infoinput={profileData?.PAddress}
          />
          <Profilecard
            imageSource={countryIcon}
            infoheading="Country"
            infoinput={profileData?.P_Country}
          />
          <Profilecard
            imageSource={stateIcon}
            infoheading="State"
            infoinput={profileData?.P_State}
          />
          <Profilecard
            imageSource={cityIcon}
            infoheading="City"
            infoinput={profileData?.P_City}
          />
          <Profilecard
            imageSource={zipIcon}
            infoheading="ZipCode"
            infoinput={profileData?.PZipCode}
            isLast={true}
          />
        </View>
        {/* Local Address Info Card Started         */}

        <Text style={styles.infocardHeading}>Local Address</Text>

        <View style={styles.infocardcontainer}>
          <Profilecard
            imageSource={addressIcon}
            infoheading="Local"
            infoinput={profileData?.CAddress}
          />
          <Profilecard
            imageSource={countryIcon}
            infoheading="Country"
            infoinput={profileData?.CountryName}
          />
          <Profilecard
            imageSource={stateIcon}
            infoheading="State"
            infoinput={profileData?.StateName}
          />
          <Profilecard
            imageSource={cityIcon}
            infoheading="City"
            infoinput={profileData?.CityName}
          />
          <Profilecard
            imageSource={zipIcon}
            infoheading="ZipCode"
            infoinput={profileData?.PZipCode}
            isLast={true} // Set this to true for the last card
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
      <Text
        style={styles.infoinput}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {infoinput}
      </Text>
    </View>
  </View>
);

export default Profile;
