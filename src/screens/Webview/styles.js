import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the WebView takes full space of the screen
  },
  webview: {
    flex: 1, // Make sure the WebView fills the entire container
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
    zIndex: 1,
  },
});

export default styles;
