import {StyleSheet, Dimensions} from 'react-native';

import {colors, fontSizes, fontWeights} from '../../styles';

import {halfIndent, indent} from '../../styles/dimensions';
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    color: colors.black,
  },
  notInterested: {
    color: colors.black,
  },
  container: {
    height: '100%',
  },
  pickerItem: {
    color: colors.black,
  },
  inputcontainer: {
    padding: 30,
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    color: colors.blue,
  },
  subheading: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    color: colors.blue,
  },
  formheading: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  inputitems: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    padding: 20,
    marginTop: indent * 1,
    fontSize: 20,
  },

  labels: {
    marginTop: indent * 1,
    fontSize: fontSizes.veryVerySmall,
    fontWeight: fontWeights.bold,
    color: '#6e6e6e',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    backgroundColor: '#e3e6ea',
    color: colors.black,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  pickerInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    backgroundColor: '#e3e6ea',
    color: colors.black,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 15,
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 15,
  },
  btnText: {
    color: colors.white,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
});
export default styles;
