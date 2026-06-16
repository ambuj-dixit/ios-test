import {store} from '../store';
import API from './api';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigation';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isInterceptorAttached = false;

const setupAxiosInterceptors = () => {
  if (isInterceptorAttached) return;
  isInterceptorAttached = true;

  let isSessionExpiredAlertShown = false;

  // Request Interceptor: Dynamic Token and BaseURL correction
  API.interceptors.request.use(function (config) {
    try {
      const state = store.getState();
      const loginState = state?.login;

      // 1. Base URL Alignment
      const instDetails = loginState?.instituteDetails;
      const instituteApi = Array.isArray(instDetails) ? instDetails[0]?.API : instDetails?.API;

      if (instituteApi && config.url && !config.url.startsWith('http')) {
        config.baseURL = instituteApi;
      }

      // 2. Token Injection
      const userDetails = loginState?.userDetails;
      const token = userDetails?.AccessToken || userDetails?.Token;

      const urlStr = config.url || '';
      const isAuthApi = urlStr.includes('StudentPortalLogin') ||
                        urlStr.includes('FacultyPortalLogin') ||
                        urlStr.includes('Forgot_Password') ||
                        urlStr.includes('GetClientName');

      if (!isAuthApi && token) {
        config.headers['Access-Token'] = token;
      }

      return config;
    } catch (err) {
      console.error('Interceptor internal error:', err);
      return config;
    }
  }, function (error) {
    return Promise.reject(error);
  });

  // Response Interceptor: Handles session expiration
  API.interceptors.response.use(function (response) {
    if (response?.data) {
      const url = response.config.url || '';
      const isNotificationApi = url.includes('ERPInAppNotifications');

      if (
        response?.data?.status === 'Fail' &&
        response?.data?.message === 'Invalid Token' &&
        !isNotificationApi
      ) {
        if (!isSessionExpiredAlertShown) {
          isSessionExpiredAlertShown = true;

          Alert.alert('ESIM', 'Your session has been expired, Please log in again', [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('facltyData');
                store.dispatch({ type: 'USER_LOGOUT' });

                navigationRef?.current?.dispatch(
                  CommonActions.reset({ index: 0, routes: [{name: 'institudeCode'}] })
                );
                isSessionExpiredAlertShown = false;
              },
            },
          ]);
        }
      }
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
};

export default setupAxiosInterceptors;
