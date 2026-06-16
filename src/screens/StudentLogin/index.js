import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {loginOperations} from '../../reduxOperations/login';

import LoginView from './loginView';
import commonFunctions from '../../utils';
import OneSignal from 'react-native-onesignal';
import { dashboardOperations } from '../../reduxOperations/dashboard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContainer = props => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const payload = {
      username,
      password,
    };

    let error = '';
    if (!password) {
      error = 'Please enter password';
    }

    if (!username) {
      error = 'Please enter username';
    }

    if (error) {
      commonFunctions.showErrorMessage(error);
      return;
    }

    const onSuccess = res => {
      if (res) {
        console.log('reslogn',res);
        commonFunctions.showSuccessMessage(res.message, async() => {
          // If setup is required, skip normal login flow and go to Setup Screen
          if (res.setupRequired) {
            props.navigation.navigate('feeSetup', { pendingUser: res.data });
            return;
          }

          const device = await OneSignal.getDeviceState();
          if (device) {
            console.log('📲 Player ID:', device.userId);
            console.log('🔑 Push Token:', device.pushToken);

            // ✅ Step 2: Send playerId + studentId to backend
            try {
              const body = {
                StudentID: res.data.StudentId,
                DeviceId: device.userId,
                Token: device.pushToken,
                Type: 'S',
                // Message: `Hello ${student.StudentName}, your result is out!`, // dynamic message
              };

              console.log('📦 Sending body:', body);

              const response = await axios.post(
                'http://182.18.162.129:83/Calender_details.asmx/SaveDeviceIDAndToken',
                body,
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                },
              );
              console.log('✅ Notification sent successfully:', response.data);
            } catch (error) {
              console.log(
                '❌ Notification failed:',
                error.message,
                error.response?.data,
              );
            }
          }
          try {
            await AsyncStorage.setItem('userData', JSON.stringify(res.data));
          } catch (err) {
            console.log('Error saving user data', err);
          }
          props.navigation.navigate('main');
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

    dispatch(loginOperations.studentLogin(payload, onSuccess, onFailure));
  };

  const onForgotPasswordButtonclick = () => {
    props.navigation.navigate('forgotPassword');
  };

  return (
    <LoginView
      setUsername={setUsername}
      isLoading={props.isLoading}
      onLogin={handleLogin}
      username={username}
      onForgotPasswordButtonclick={onForgotPasswordButtonclick}
      setPassword={setPassword}
      password={password}
      instituteDetails={props.instituteDetails}
      navigation={props.navigation}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  instituteDetails: state.login.instituteDetails,
});

export default connect(mapStateToProps)(LoginContainer);
