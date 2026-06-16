import {StyleSheet} from 'react-native';

import {colors, fontSizes, fontWeights} from '../../styles';
import {Dimensions} from 'react-native';
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
  innerHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  btncontain: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnChangepassword: {
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 8,
    color: 'white',
    backgroundColor: colors.blue,
  },
  btnReset: {
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 8,
    color: 'white',
    backgroundColor: '#33354e',
  },

  btnChangepasswordtext: {
    color: 'white',
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
  },
  cardsection: {},
  cardheading: {
    fontSize: fontSizes.small,
    marginVertical: 15,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  card: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d9d8d8',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: indent,
  },
  leftitems: {
    borderRightWidth: 1,
    borderColor: '#d9d8d8',
    width: '45%',
    gap: 10,
  },
  rightitems: {
    width: '45%',
    gap: 10,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  nameheading: {
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
  },
  name: {
    fontSize: fontSizes.small,
    color: colors.black,
  },
  checkbox: {
    marginHorizontal: 10,
  },
});
export default styles;
