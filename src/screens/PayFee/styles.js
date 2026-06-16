import {StyleSheet} from 'react-native';
import {colors, fontSizes, fontWeights} from '../../styles';
import {halfIndent, indent} from '../../styles/dimensions';

export const styles = new StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 25,
    borderRadius: 10,
  },
  redText: {
    color: colors.red,
    fontStyle: 'italic',
    fontSize: fontSizes.veryVerySmall,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    color: colors.black,
  },
  input: {
    width: 125,
    // height: 40,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    color: colors.black,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorMsg: {
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    marginTop: indent * 2,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.small,
    textAlign: 'center',
    paddingVertical: halfIndent,
    fontWeight: fontWeights.bold,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // ensures it's above everything
  },
});
