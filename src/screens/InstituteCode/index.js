import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {loginOperations} from '../../reduxOperations/login';

import LoginView from './instituteCodeView';
import commonFunctions from '../../utils';
import { API } from '../../services';
import DeviceInfo from 'react-native-device-info'; 
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LATEST_VERSION = '2.0';

const InstituteCodeContainer = props => {
  const dispatch = useDispatch();
  const [orgCode, setOrgCode] = useState('');
  const [showForceUpdate, setShowForceUpdate] = useState(false);
  
  const handleUpdateNow = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/in/app/esim-campus-solution/id6470990621',
      android:
        'https://play.google.com/store/apps/details?id=com.mkt.studentportal&hl=en',
    });
    Linking.openURL(storeUrl);
  };


  const handleSubmit = async () => {
    const payload = {
      OrgCode: orgCode,
    };

    let error = '';

    if (!orgCode) {
      error = 'Please enter Institute Code';
    }

    if (error) {
      commonFunctions.showErrorMessage(error);
      return;
    }

    const onSuccess = res => {
      if (res) {
        console.log('reslogin++++', res.data.API);
        API.defaults.baseURL = res.data.API;
        commonFunctions.showSuccessMessage(res.message, () => {
          props.navigation.navigate('selectUserType', {orgCode});
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
      loginOperations.getInstituteResponse(payload, onSuccess, onFailure),
    );
  };



  return (
    <LoginView
      setOrgCode={setOrgCode}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      orgCode={orgCode}
      showForceUpdate={showForceUpdate}
      onForceUpdateClose={() => setShowForceUpdate(false)}
      onForceUpdatePress={handleUpdateNow}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
});

export default connect(mapStateToProps)(InstituteCodeContainer);
