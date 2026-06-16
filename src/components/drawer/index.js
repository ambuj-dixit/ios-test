import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  backgroundImage,
  logoutIcon,
  maleProfile,
  menubackgroundImage,
} from '../../assets/images';
import styles from './styles';
import DrawerItem from '../drawerItem';

import {CommonActions} from '@react-navigation/native';
import {persistor} from '../../store';
import {userLogout} from '../../reduxOperations/dashboard/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = props => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    dispatch(userLogout());
    // Clear all storage mechanisms synchronously to prevent race conditions
    await Promise.all([
      AsyncStorage.removeItem('userData'),
      AsyncStorage.removeItem('facltyData'),
      persistor.purge(),
    ]);
    await persistor.flush(); // Force write clear to disk

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'institudeCode'}],
      }),
    );
  };

  const {profileData} = props;
  const {employeeDetail} = props;

  return (
    <ImageBackground source={menubackgroundImage} style={styles.root}>
      <ScrollView indicatorStyle="black" persistentScrollbar={true}>
        <View>
          {employeeDetail?.Primary_Detail ? (
            <View style={styles.drawerTop}>
              {employeeDetail?.Employee_Image?.Photo &&
              employeeDetail?.Employee_Image?.Photo !== 'N/A' ? (
                <Image
                  source={{
                    uri:
                      'data:image/png;base64,' +
                      employeeDetail?.Employee_Image?.Photo,
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
              <Text style={styles.userName}>
                {employeeDetail?.Primary_Detail?.EmployeeName ?? 'User'}
              </Text>
              <Text style={styles.profiledetails}>
                ({employeeDetail?.Basic_detail?.DepartmentName})
              </Text>
            </View>
          ) : (
            <View style={styles.drawerTop}>
              {profileData?.Photo && profileData?.Photo !== 'N/A' ? (
                <Image
                  source={{uri: 'data:image/png;base64,' + profileData?.Photo}}
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
              <Text style={styles.userName}>
                {props?.userDetails?.studentname ?? 'User'}
              </Text>
            </View>
          )}

          {props.dashboardDetails &&
            props.userDetails &&
            Object.values(props.dashboardDetails)?.length > 0 &&
            Object.values(props.dashboardDetails).map((item, index) => (
              <DrawerItem
                item={item}
                key={index}
                index={index}
                navigation={props.navigation}
              />
            ))}
          {props.dashbordDetailsNav && props.userDetails &&
            Object.values(props.dashbordDetailsNav)?.length > 0 &&
            Object.values(props.dashbordDetailsNav).map((item, index) => (
              <DrawerItem
                item={item}
                key={index}
                index={index}
                navigation={props.navigation}
              />
            ))}
        </View>
      </ScrollView>
      <Pressable style={styles.signOut} onPress={onLogout}>
        <View style={styles.iconContainer}>
          <Image resizeMode="contain" source={logoutIcon} style={styles.icon} />
        </View>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  dashboardDetails: state.dashboard.dashboardData,
  dashbordDetailsNav: state.dashboard.facultyDashboardDataNav,
  profileData: state.profile.profileData,
  employeeDetail: state.dashboard.facultyDashboardData,
});

export default connect(mapStateToProps)(Drawer);
