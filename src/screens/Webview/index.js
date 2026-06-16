import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import { HeaderWithTitle } from '../../components';

const WebViewScreen = ({route, navigation}) => {
  
  const {url} = route?.params;
  const {Title} = route?.params
  console.log('Title', Title);
  
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      )}
      <HeaderWithTitle title={Title} navigation={navigation} />
      <WebView
        source={{uri: url}}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

export default WebViewScreen;
