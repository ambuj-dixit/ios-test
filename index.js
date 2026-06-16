/**
 * @format
 */

import 'react-native-gesture-handler';
import './base64PollyFill';
import * as ReactNative from 'react-native';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Polyfill for ViewPropTypes (Fixed for React Native 0.72+)
if (!ReactNative.ViewPropTypes) {
    ReactNative.ViewPropTypes = require('deprecated-react-native-prop-types').ViewPropTypes;
}
if (!ReactNative.Text.propTypes) {
    ReactNative.Text.propTypes = require('deprecated-react-native-prop-types').TextPropTypes;
}
if (!ReactNative.View.propTypes) {
    ReactNative.View.propTypes = require('deprecated-react-native-prop-types').ViewPropTypes;
}

// Ignore all log notifications (Warnings and non-fatal errors)
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
