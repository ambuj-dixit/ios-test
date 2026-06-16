import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen space
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
  webview: {
    flex: 1, // Ensures the WebView takes up the full screen space
  },
  loader: {
    position: 'absolute', // Positions the loader on top of the WebView
    top: '50%', // Center the loader vertically in the parent container
    left: '50%', // Center the loader horizontally in the parent container
    marginLeft: -25, // Offset by half the size of the loader to truly center it
    marginTop: -25, // Offset by half the size of the loader to truly center it
  },
});

export default styles;
