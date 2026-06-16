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
  container: {
    height: '100%',
  },
  heading: {
    fontSize: 24,
    margin: 20,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  inputcontainer: {
    padding: 30,
    flex: 1,
  },
  inputitems: {
    // marginTop: indent * 1,
    fontSize: fontSizes.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 10,
  },
  labels: {
    fontSize: fontSizes.veryVerySmall,
    fontWeight: fontWeights.bold,
    color: '#6e6e6e',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    color: colors.black,
    paddingHorizontal: 10,
    marginBottom: indent * 2,
  },
  btncontain: {
    marginTop: indent * 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btnChangepassword: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    backgroundColor: colors.blue,
  },
  btnReset: {
    borderRadius: 50,
    paddingHorizontal: 60,
    paddingVertical: 10,
    color: 'white',
    backgroundColor: '#33354e',
  },

  btnChangepasswordtext: {
    color: 'white',
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
  },
});
export default styles;
