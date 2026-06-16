import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../../styles';
import {indent} from '../../styles/dimensions';

const styles = StyleSheet.create({
  background: {
    flex: 1,

    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: '100%',
  },
  container: {
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'center',
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
    justifyContent: 'center',
    width: '80%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.blue,
  },
  subheading: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.blue,
  },
  formheading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: indent * 2,
    textAlign: 'center',
  },
  formheading2: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: 'black',
    marginTop: indent * 4,
    // textAlign: 'center'
  },
  inputitems: {
    marginTop: 30,
    fontSize: 20,
  },

  labels: {
    fontSize: 13,
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
  },
  btn: {
    marginTop: 15,
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 15,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
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
  },
  loginfootertext: {
    bottom: 10,
    color: 'black',
  },
});

export default styles;
