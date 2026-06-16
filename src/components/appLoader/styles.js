import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  modalBackground: {
    height,
    width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    zIndex: 10000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  spinner: {
    // backgroundColor: colors.grey,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: height / 2,
    zIndex: 999,
  },
  activityIndicatorWrapper: {
    // backgroundColor: colors.grey,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
