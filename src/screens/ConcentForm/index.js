/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Concentformview from './Concentformview';
import commonFunctions from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {dashboardOperations} from '../../reduxOperations/dashboard';
import {useIsFocused} from '@react-navigation/native';
import {concentformOperations} from '../../reduxOperations/ConcentForm';

const ConsentFormContainer = props => {
  const dispatch = useDispatch();
  const [isItemPickerModalVisible, setisItemPickerModalVisible] =
    useState(false);

  const [issecondItemPickerModalVisible, setissecondItemPickerModalVisible] =
    useState(false);

  const handleSubmit = data => {
    if (props.userDetails) {
      const payload = {
        ...data,
        StudentId: props.userDetails.StudentId,
      };

      const onSuccess = res => {
        if (res) {
          commonFunctions.showSuccessMessage(res.message, () => {
            // props.navigation.navigate('main');
          });
        }
      };

      const onFailure = err => {
        if (err?.message) {
          commonFunctions.showErrorMessage(err.message);
        } else {
          commonFunctions.showErrorMessage(
            'Something went wrong. Please try again',
          );
        }
      };
      dispatch(
        concentformOperations.getConcentForm(payload, onSuccess, onFailure),
      );
    }
  };

  const toggleItemPickerModal = () => {
    setisItemPickerModalVisible(t => !t);
  };

  const toggleSecondPicker = () => {
    setissecondItemPickerModalVisible(t => !t);
  };

  return (
    <Concentformview
      academicDetails={props?.academicDetails}
      navigation={props.navigation}
      handlePress={handleSubmit}
      isItemPickerModalVisible={isItemPickerModalVisible}
      issecondItemPickerModalVisible={issecondItemPickerModalVisible}
      toggleItemPickerModal={toggleItemPickerModal}
      toggleSecondPicker={toggleSecondPicker}
    />
  );
};

const mapStateToProps = state => ({
  userDetails: state.login.userDetails,
  profileData: state.profile.profileData,
  dashboardDetails: state.dashboard.dashboardData,
  academicDetails: state.dashboard.academicDetails,
});

export default connect(mapStateToProps)(ConsentFormContainer);
