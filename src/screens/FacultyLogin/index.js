import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {loginOperations} from '../../reduxOperations/login';

import LoginView from './loginView';
import commonFunctions from '../../utils';
import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';
import {showSuccessMessage} from '../../utils/commonFunctions';
import {Share} from 'react-native';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContainer = props => {
  const dispatch = useDispatch();
  // const [username, setUsername] = useState('SEEA01745');
  // const [password, setPassword] = useState('Arpit@20');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Session, setSession] = useState('');
  const [IMEINo, setIMEINo] = useState('');
  const getDeviceUniqueID = async () => {
  const id = await DeviceInfo.getUniqueId();

    setIMEINo(id);
  };

  useEffect(() => {
    const scb = () => {};
    const ecb = () => {};

    dispatch(
      loginOperations.getSessions(props?.instituteDetails?.InstID, scb, ecb),
    );

    getDeviceUniqueID();
  }, []);

  useEffect(() => {
    if (props.sessions?.length > 0) {
      const filtered = props.sessions.filter(
        v => v['Selected Status'] === 'True',
      );
      if (filtered.length > 0) {
        setSession(filtered[0].Session);
      }
    }
  }, [props.sessions]);

  const handleLogin = async () => {
    const payload = {
      Session,
      UserName: username,
      pwd: password,
      IMEINo,
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
          const device = await OneSignal.getDeviceState();
          if (device) {
            console.log('📲 Player ID:', device.userId);
            console.log('🔑 Push Token:', device.pushToken);

            // ✅ Step 2: Send playerId + studentId to backend
            try {
              const body = {
                StudentID: res.data[0].Empid,
                DeviceId: device.userId,
                Token: device.pushToken,
                Type: 'F',
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
            await AsyncStorage.setItem('facltyData', JSON.stringify(res.data));
          } catch (err) {
            console.log('Error saving user data', err);
          }
          props.navigation.navigate('main', {
            screen: 'home',
            params: {
              screen: 'facultyDashboard',
            },
          });
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

    dispatch(loginOperations.facultyLogin(payload, onSuccess, onFailure));
  };

  const onForgotPasswordButtonclick = () => {
    props.navigation.navigate('forgotPassword');
  };

  const copyUniqueId = () => {
    if (IMEINo) {
      Share.share({
        message: IMEINo,
      });
    }
  };

  return (
    <LoginView
      setUsername={setUsername}
      isLoading={props.isLoading}
      sessions={props.sessions}
      onLogin={handleLogin}
      username={username}
      copyUniqueId={copyUniqueId}
      onForgotPasswordButtonclick={onForgotPasswordButtonclick}
      setPassword={setPassword}
      password={password}
      Session={Session}
      setSession={setSession}
      instituteDetails={props.instituteDetails}
      navigation={props.navigation}
      IMEINo={IMEINo}
      setIMEINo={setIMEINo}
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  instituteDetails: state.login.instituteDetails,
  sessions: state.login.sessions,
});

export default connect(mapStateToProps)(LoginContainer);
