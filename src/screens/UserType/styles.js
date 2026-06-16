import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes, fontWeights} from '../../styles';
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
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.blue,
    fontSize: fontSizes.small,
    textAlign: 'center',
    fontWeight: fontWeights.bold,
  },
  button: {
    borderWidth: 3,
    borderColor: colors.blue,
    borderRadius: halfIndent,
    marginVertical: indent,
    width: '45%',
    paddingHorizontal: indent * 2,
    paddingVertical: indent,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  inputitems: {
    marginTop: 30,
    fontSize: fontSizes.verySmall,
  },

  labels: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    color: colors.black,
    marginBottom: 20,
    paddingHorizontal: 10,
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
