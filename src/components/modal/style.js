import {StyleSheet, Dimensions, Platform} from 'react-native';

import {halfIndent, indent} from '../../styles/dimensions';
import {colors, fontSizes, fontWeights} from '../../styles';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalRoot: {
    backgroundColor: '#00000040',
    flex: 1,
    justifyContent: 'flex-end',
    // justifyContent: 'center',
    padding: 10,
  },
  mainContainer: {
    borderRadius: 15,
  },
  dateInput: {
    borderWidth: 1,
    padding: halfIndent * 1.5,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '70%',
    alignSelf: 'center',
    marginTop: indent,
  },
  helperText: {
    color: colors.blue,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  modalHeader: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingHorizontal: indent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: halfIndent,
    justifyContent: 'space-between',
    borderTopLeftRadius: halfIndent / 2,
    borderTopRightRadius: halfIndent,
  },
  closeText: {
    color: colors.blue,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },

  modalBody: {
    backgroundColor: colors.white,
    paddingBottom: 0,
    height: (2 * height) / 3,
  },

  dropdown: {
    fontSize: fontSizes.verySmall,
    borderWidth: 1,
    borderColor: '#00000022',
    borderRadius: 5,

    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  dropdownSelectedText: {
    fontSize: fontSizes.verySmall,
    padding: 0,
    color: colors.black,
  },
  dropdownContainerStyle: {
    padding: 0,
    backgroundColor: 'red',
  },
  attendanceContainer: {
    padding: indent * 0.75,
    paddingBottom: 0,
  },
  attendanceView: {
    margin: indent / 2,
  },
  scrollView: {
    // paddingBottom: indent,
  },
  heading: {
    fontSize: fontSizes.verySmall,
    padding: 2,
  },
  important: {
    color: colors.red,
  },
});
export default styles;
