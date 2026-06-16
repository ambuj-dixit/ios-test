import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';

const CustomWebView = ({url}) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: url}}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator color="#000" size="large" style={styles.loader} />
        )}
      />
    </View>
  );
};

export default CustomWebView;
