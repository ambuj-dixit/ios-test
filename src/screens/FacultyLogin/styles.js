import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../../styles';
import {halfIndent, indent} from '../../styles/dimensions';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  copyText: {
    color: colors.black,
  },
  copyButton: {
    alignItems: 'center',
  },
  uniqueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownSelectedText: {
    fontSize: fontSizes.small,
  },
  dropdown: {
    marginBottom: indent,
    marginLeft: halfIndent,
    fontSize: fontSizes.small,
  },
  container: {
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: 20,
  },
  loginhead: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  inputcontainer: {
    flex: 1,
    width: '90%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  heading: {
    fontSize: fontSizes.xbig,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
  },
  subheading: {
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
  },
  formheading: {
    fontSize: fontSizes.big,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  formSubheading: {
    fontSize: fontSizes.medium,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputitems: {
    marginTop: 30,
    fontSize: fontSizes.verySmall,
  },

  labels: {
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
    color: '#6e6e6e',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    color: colors.black,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: fontSizes.small,
  },
  disabledInput: {
    width: '80%',
    backgroundColor: 'rgb(220, 220, 228)',
    marginBottom: 0,
  },
  btn: {
    marginTop: 15,
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 15,
  },
  btnText: {
    color: 'white',
    fontSize: fontSizes.verySmall,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotlabel: {
    marginTop: 15,
    color: '#6e6e6e',
    textAlign: 'center',
  },
  loginfooter: {
    margin: 10,
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  loginfootertext: {
    bottom: 10,
    color: 'black',
  },
});

export default styles;
