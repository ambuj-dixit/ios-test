import React, { useEffect } from 'react';
import RootNavigator from './navigation/rootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import AppLoader, { loaderRef } from './components/appLoader';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { setupAxiosInterceptors } from './services';
import API from './services/api';
import { Alert, BackHandler, Linking, Platform, StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import OneSignal from 'react-native-onesignal';
import { navigationRef } from './navigation/RootNavigation';
import SpInAppUpdates from 'sp-react-native-in-app-updates';
import { colors } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const inAppUpdates = new SpInAppUpdates(true);

const App = () => {

  const setUpOneSignal = () => {
    OneSignal.setAppId('9852ce6d-71a3-428d-a169-58744209c9c6');
    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.getDeviceState().then(device => {
      if (device) {
        console.log('📲 OneSignal Player ID:', device.userId);
        console.log('🔑 Push Token (FCM/APNs):', device.pushToken);
      }
    });

    OneSignal.setNotificationWillShowInForegroundHandler(event => {
      let notification = event.getNotification();
      console.log('🔔 Notification received in foreground:', notification);
      event.complete(notification);
    });

    OneSignal.setNotificationOpenedHandler(event => {
      console.log('👆 Notification opened:', event);
    });
  };

  useEffect(() => {
    // 1. Setup global interceptors immediately on boot
    setupAxiosInterceptors();

    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        const redirectToStore = () => {
          let url = '';
          if (Platform.OS === 'android') {
            url = 'https://play.google.com/store/apps/details?id=com.mkt.studentportal';
          } else if (Platform.OS === 'ios') {
            url = 'https://apps.apple.com/us/app/esim-campus-student/id6470990621';
          }
          BackHandler.exitApp();
          Linking.canOpenURL(url).then(() => {
            Linking.openURL(url);
          });
        };
        Alert.alert(
          'ESIM Campus Student',
          'New version is available, please click to update.',
          [{ text: 'Update', onPress: redirectToStore }]
        );
      }
    });

    setUpOneSignal();
  }, []);

  const onReady = async () => {
    SplashScreen.hide();

    try {
      const state = store.getState();
      const userDetails = state.login?.userDetails;
      const instDetails = state.login?.instituteDetails;

      // Master Lock for Cold Boot:
      // Manually force the Base URL on the API instance before navigation
      const instituteApi = Array.isArray(instDetails) ? instDetails[0]?.API : instDetails?.API;
      if (instituteApi) {
          API.defaults.baseURL = instituteApi;
      }

      if (userDetails) {
        if (userDetails.StudentId) {
          navigationRef.current?.navigate('main');
        } else if (userDetails.Empid || userDetails.EmpID) {
          navigationRef.current?.navigate('main', {
            screen: 'home',
            params: { screen: 'facultyDashboard' },
          });
        } else {
          navigationRef.current?.navigate('institudeCode');
        }
      } else {
        const userData = await AsyncStorage.getItem('userData');
        const facltyData = await AsyncStorage.getItem('facltyData');

        if (userData) {
          navigationRef.current?.navigate('main');
        } else if (facltyData) {
          navigationRef.current?.navigate('main', {
            screen: 'home',
            params: { screen: 'facultyDashboard' },
          });
        } else {
          navigationRef.current?.navigate('institudeCode');
        }
      }
    } catch (error) {
      console.error('Initialization error:', error);
      navigationRef.current?.navigate('institudeCode');
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: colors.blue }}>
      <RootSiblingParent>
        <StatusBar backgroundColor={colors.blue} />
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer onReady={onReady} ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
            </PersistGate>
          </Provider>
          <AppLoader ref={loaderRef} />
        </SafeAreaView>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export default App;
