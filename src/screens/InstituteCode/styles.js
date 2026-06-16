import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes} from '../../styles';

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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelText: {
    color: '#888',
    fontSize: 14,
  },
});

export default styles;
